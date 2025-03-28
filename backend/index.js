import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import { error } from 'console';
import { promisify } from 'util';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
dotenv.config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Database connection.
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Database Connected');
});

// Graceful Server Shutdown
process.on('SIGINT', () => {
  db.end((err) => {
    console.log('Database connection closed.');
    process.exit(err ? 1 : 0);
  });
});

// To Improve error handling.
// app.get('/holiday-suspension', (req, res) => {
//   db.query('SELECT * FROM holidayandsuspension', (err, result) => {
//     if (err) {
//       console.error('Database Query Error', err.message);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//     res.json(result);
//   });
// });

// To reduced callback hell.
// Convert `db.query` into a Promise-based function
const query = promisify(db.query).bind(db);

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
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
