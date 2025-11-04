import express from "express";
import { query } from "../db.js";

const router = express.Router();

// Generate transaction number
function generateTransaction(prefix = "FA") {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rnd = Math.floor(Math.random() * 900) + 100;
  return `${prefix}-${yy}${mm}${dd}-${rnd}`;
}

// Get all the financial assistance
router.get("/", async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM financial_assistance WHERE is_active = 1 ORDER BY date_created DESC`
    );
    res.json(result);
  } catch (err) {
    console.error("GET /financial_assistance error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single record
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `SELECT * FROM financial_assistance WHERE id = ? AND is_active = 1`;

    const result = await query(sql, [id]);

    if (result.length === 0)
      return res.status(404).json({ error: "Record not found" });

    res.json(result);
  } catch (err) {
    console.error(`GET /financial_assistance/${req.params.id} error:`, err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a record
router.post("/", async (req, res) => {
  try {
    const {
      name,
      age,
      birthdate,
      address,
      income,
      purpose,
      date_issued,
      transaction_number,
    } = req.body;

    if (!name || !address)
      return res.status(400).json({ error: "Name and Address required" });

    const tx = transaction_number || generateTransaction("FA");
    const sql = `INSERT INTO financial_assistance( 
      name,
      age,
      birthdate,
      address,
      income,
      purpose,
      date_issued,
      transaction_number) VALUES (?,?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      name,
      age,
      birthdate,
      address,
      income,
      purpose,
      date_issued,
      tx,
    ]);

    res.status(201).json({
      message: "Financial added succesfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error("POST /financial_assistance error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE record
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      age,
      birthdate,
      address,
      income,
      purpose,
      date_issued,
      transaction_number,
    } = req.body;

    if (!name || !address) {
      return res.status(400).json({ error: "name and address are required" });
    }

    const sql = `UPDATE financial_assistance SET name = ?, age = ?, birthdate = ?, address = ?, income = ?, purpose = ?, date_issued = ?, transaction_number = ? WHERE id = ?`;

    const result = await query(sql, [
      name,
      age,
      birthdate,
      address,
      income,
      purpose,
      date_issued,
      transaction_number,
      id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Financial record not found" });

    res.json({ message: "Financial record updated" });
  } catch (err) {
    console.error("PUT /financial_assistance", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `UPDATE financial_assistance set is_active = 0 WHERE id = ?`;

    const result = await query(sql, [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Financial record not found" });

    res.json({ message: "Financial record deleted" });
  } catch (err) {
    console.error("DELETE /financial_assistance error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
