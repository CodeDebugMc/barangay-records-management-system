import express from "express";
import bcrypt from "bcryptjs";
import { query } from "../db.js";

const router = express.Router();

// REGISTER START HERE
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and Password are required" });
    }

    // Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUsers = await query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Insert user
    await query("INSERT INTO users(username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("Error in POST /register:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
