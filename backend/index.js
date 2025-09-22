import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
dotenv.config();
const port = process.env.PORT || 3000;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Graceful Server Shutdown
process.on('SIGINT', () => {
  db.end()
    .then(() => {
      console.log('Database pool closed.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error closing database pool:', err);
      process.exit(1);
    });
});

// To reduced callback hell.
// Convert `db.query` into a Promise-based function
const query = promisify(db.query).bind(db);

// REGISTER START HERE
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and Password are required' });
    }

    // Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUsers = await query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Insert user
    await query('INSERT INTO users(username, password) VALUES (?, ?)', [
      username,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error('Database Register Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// LOGIN START HERE
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await query('SELECT * FROM users WHERE username = ?', [
      username,
    ]);

    if (user.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    const token = jwt.sign(
      { username: user[0].username, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      username: user[0].username,
      role: user[0].role,
      token,
    });
  } catch (err) {
    console.error('Database Login Error:', err.message);
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});

// HOLIDAY AND SUSPENSION START HERE

app.get('/holiday-suspension', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM holidayandsuspension`);
    res.json(result);
  } catch (err) {
    console.error('Database Query Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/holiday-suspension', async (req, res) => {
  try {
    const { description, date, status } = req.body;
    // Check the required field
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    const sql = `INSERT INTO holidayandsuspension (description, date, status) VALUES (?,?,?)`;
    const result = await query(sql, [description, date, status]);

    res.status(201).json({
      message: 'Holiday and Suspension record added succesfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Database Insert Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Holiday and Suspenstion
app.put('/holiday-suspension/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const { description, date, status } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const sql = `UPDATE holidayandsuspension SET description = ?, date = ?, status = ? WHERE id = ?`;

    const result = await query(sql, [description, date, status, id]);

    // Check if a record was actually updated
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: 'Holiday suspension record not found' });
    }

    res.json({ message: 'Holiday suspension record updated successfully' });
  } catch (err) {
    console.error('Database Update Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/holiday-suspension/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Delete query
    const result = await query(
      'DELETE FROM holidayandsuspension WHERE id = ?',
      [id]
    );

    // Check if a record was actually deleted
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: 'Holiday suspension record not found' });
    }

    res.json({ message: 'Holiday suspension record deleted successfully' });
  } catch (err) {
    console.error('Database Delete Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//===================
// LEAVE TABLE
// =================

app.get('/leave', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM leave_table`);
    res.json(result);
  } catch (err) {
    console.error('Database Query Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/leave', async (req, res) => {
  try {
    const { leave_code, description, number_hours, status } = req.body;
    // Check the required field
    if (!leave_code) {
      return res.status(400).json({ error: 'Leave code is required' });
    }
    const sql = `INSERT INTO leave_table (leave_code, description, number_hours, status) VALUES (?,?,?,?)`;
    const result = await query(sql, [
      leave_code,
      description,
      number_hours,
      status,
    ]);

    res.status(201).json({
      message: 'Leave record added succesfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Database Insert Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Leave
app.put('/leave/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const { leave_code, description, number_hours, status } = req.body;

    if (!leave_code) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const sql = `UPDATE leave_table SET leave_code = ?, description = ?, number_hours = ?, status = ? WHERE id = ?`;

    const result = await query(sql, [
      leave_code,
      description,
      number_hours,
      status,
      id,
    ]);

    // Check if a record was actually updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave  record not found' });
    }

    res.json({ message: 'Leave record updated successfully' });
  } catch (err) {
    console.error('Database Update Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/leave/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Delete query
    const result = await query('DELETE FROM leave_table WHERE id = ?', [id]);

    // Check if a record was actually deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave record not found' });
    }

    res.json({ message: 'Leave record deleted successfully' });
  } catch (err) {
    console.error('Database Delete Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//==================
// DEPARTMENT TABLE
//==================

app.get('/department', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM department_table`);
    res.json(result);
  } catch (err) {
    console.error('Database Query Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/department', async (req, res) => {
  try {
    const { code, description } = req.body;
    // Check the required field
    if (!code) {
      return res.status(400).json({ error: 'Leave code is required' });
    }
    const sql = `INSERT INTO department_table  (code, description) VALUES (?,?)`;
    const result = await query(sql, [code, description]);

    res.status(201).json({
      message: 'Leave record added succesfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Database Insert Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Leave
app.put('/department/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const { code, description } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const sql = `UPDATE department_table SET code = ?, description = ? WHERE id = ?`;

    const result = await query(sql, [code, description, id]);

    // Check if a record was actually updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave  record not found' });
    }

    res.json({ message: 'Leave record updated successfully' });
  } catch (err) {
    console.error('Database Update Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/department/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Delete query
    const result = await query('DELETE FROM department_table WHERE id = ?', [
      id,
    ]);

    // Check if a record was actually deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave record not found' });
    }

    res.json({ message: 'Leave record deleted successfully' });
  } catch (err) {
    console.error('Database Delete Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//==================
// Department Assignment Table  TABLE
//==================

app.get('/salary-grade', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM  salary_grade_table`);
    res.json(result);
  } catch (err) {
    console.error('Database Query Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/salary-grade', async (req, res) => {
  try {
    const { department_id, employeeID } = req.body;
    // Check the required field
    if (!department_id) {
      return res.status(400).json({ error: 'Leave code is required' });
    }
    const sql = `INSERT INTO department_assignment (department_id, employeeID ) VALUES (?,?)`;
    const result = await query(sql, [department_id, employeeID]);

    res.status(201).json({
      message: 'Leave record added succesfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Database Insert Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Leave
app.put('/department-assignment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const { department_id, employeeID } = req.body;

    if (!department_id) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const sql = `UPDATE department_assignment SET  department_id = ?, employeeID = ? WHERE id = ?`;

    const result = await query(sql, [department_id, employeeID, id]);

    // Check if a record was actually updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave  record not found' });
    }

    res.json({ message: 'Leave record updated successfully' });
  } catch (err) {
    console.error('Database Update Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/department-assignment/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Delete query
    const result = await query(
      'DELETE FROM department_assignment WHERE id = ?',
      [id]
    );

    // Check if a record was actually deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave record not found' });
    }

    res.json({ message: 'Leave record deleted successfully' });
  } catch (err) {
    console.error('Database Delete Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//==================
// Department Assignment Table  TABLE
//==================

app.get('/department-assignment', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM department_assignment`);
    res.json(result);
  } catch (err) {
    console.error('Database Query Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/department-assignment', async (req, res) => {
  try {
    const { department_id, employeeID } = req.body;
    // Check the required field
    if (!department_id) {
      return res.status(400).json({ error: 'Leave code is required' });
    }
    const sql = `INSERT INTO department_assignment (department_id, employeeID ) VALUES (?,?)`;
    const result = await query(sql, [department_id, employeeID]);

    res.status(201).json({
      message: 'Leave record added succesfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Database Insert Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Leave
app.put('/department-assignment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const { department_id, employeeID } = req.body;

    if (!department_id) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const sql = `UPDATE department_assignment SET  department_id = ?, employeeID = ? WHERE id = ?`;

    const result = await query(sql, [department_id, employeeID, id]);

    // Check if a record was actually updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave  record not found' });
    }

    res.json({ message: 'Leave record updated successfully' });
  } catch (err) {
    console.error('Database Update Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/department-assignment/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Delete query
    const result = await query(
      'DELETE FROM department_assignment WHERE id = ?',
      [id]
    );

    // Check if a record was actually deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave record not found' });
    }

    res.json({ message: 'Leave record deleted successfully' });
  } catch (err) {
    console.error('Database Delete Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//==================
// Salary Grade TABLE
//==================

app.get('/salary-grade', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM salary_grade_table`);
    res.json(result);
  } catch (err) {
    console.error('Database Query Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/salary-grade', async (req, res) => {
  try {
    const {
      effectivityDate,
      sg_number,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
    } = req.body;
    // Check the required field
    if (!effectivityDate) {
      return res.status(400).json({ error: 'Leave code is required' });
    }
    const sql = `INSERT INTO salary_grade_table (effectivityDate, sg_number, step1, step2, step3, step4, step5, step6, step7, step8) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const result = await query(sql, [
      effectivityDate,
      sg_number,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
    ]);

    res.status(201).json({
      message: 'Leave record added succesfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Database Insert Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Leave
app.put('/salary-grade/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const {
      effectivityDate,
      sg_number,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
    } = req.body;

    if (!effectivityDate) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const sql = `UPDATE salary_grade_table SET effectivityDate=?, sg_number=?, step1=?, step2=?, step3=?, step4=?, step5=?, step6=?, step7=?, step8=? WHERE id=?`;

    const result = await query(sql, [
      effectivityDate,
      sg_number,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
      id,
    ]);

    // Check if a record was actually updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave  record not found' });
    }

    res.json({ message: 'Leave record updated successfully' });
  } catch (err) {
    console.error('Database Update Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/salary-grade/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Delete query
    const result = await query('DELETE FROM salary_grade_table WHERE id = ?', [
      id,
    ]);

    // Check if a record was actually deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave record not found' });
    }

    res.json({ message: 'Leave record deleted successfully' });
  } catch (err) {
    console.error('Database Delete Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
