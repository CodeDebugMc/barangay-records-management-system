import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { query } from "../db.js";

const router = express.Router();

// LOGIN START HERE
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (user.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    const token = jwt.sign(
      { username: user[0].username, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      username: user[0].username,
      role: user[0].role,
      token,
    });
  } catch (err) {
    console.error("Error in POST /login:", err.message);
    return res.status(401).json({ error: "Invalid username or password" });
  }
});

export default router;
