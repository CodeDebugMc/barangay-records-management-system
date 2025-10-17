import express from "express";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  // req.user is from the middleware
  res.json({
    id: req.user.id,
    username: req.user.username,
    role: req.user.role,
  });
});

export default router;
