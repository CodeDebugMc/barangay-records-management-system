import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// LEAVE TABLE

// Get all leave records
router.get('/', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM leave_table`);
    res.json(result);
  } catch (err) {
    console.error('Database Query Error', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add new leave
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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

// Delete Leave
router.delete('/:id', async (req, res) => {
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

export default router;
