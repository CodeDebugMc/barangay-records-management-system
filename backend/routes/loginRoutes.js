import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { query } from "../db.js";

const router = express.Router();

// LOGIN START HERE
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const users = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (!users || users.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      username: user.username,
      role: user.role,
      id: user.id,
      token,
    });
  } catch (err) {
    console.error("Error in POST /login:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
