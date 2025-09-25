import express from "express";
import { query } from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const rows = await query("SELECT * FROM company_settings WHERE id = 1");
    res.json(rows[0] || {});
  } catch (err) {
    console.error("GET error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const { company_name, header_color, footer_text, footer_color } = req.body;
    const logoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const rows = await query("SELECT * FROM company_settings WHERE id = 1");

    if (rows.length > 0) {
      // Update
      let sql = `
        UPDATE company_settings
        SET company_name=?, header_color=?, footer_text=?, footer_color=?
      `;
      const params = [company_name, header_color, footer_text, footer_color];

      if (logoUrl) {
        sql += `, logo_url=?`;
        params.push(logoUrl);

        // Delete old logo
        const oldLogo = rows[0].logo_url;
        if (oldLogo) {
          const oldPath = path.join(__dirname, "..", oldLogo);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
      }

      sql += " WHERE id=1";
      await query(sql, params);
      res.json({ success: true, message: "Settings updated" });
    } else {
      // Insert
      await query(
        "INSERT INTO company_settings (id, company_name, logo_url, header_color, footer_text, footer_color) VALUES (1, ?, ?, ?, ?, ?)",
        [company_name, logoUrl, header_color, footer_text, footer_color]
      );
      res.json({ success: true, message: "Settings created" });
    }
  } catch (err) {
    console.error("POST error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
