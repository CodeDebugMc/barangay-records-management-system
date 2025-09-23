import express from "express";
import { query } from "../db.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File upload config
const storage = multer.diskStorage({
  destination: "../uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const result = await query(`SELECT * FROM company_settings WHERE id = 1`);
    res.send(result[0] || {});
  } catch (err) {
    console.error("Database Query Error", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Helper to delete old logo
const deleteOldLogo = (logoUrl) => {
  if (!logoUrl) return;
  const logoPath = path.join(__dirname, "..", logoUrl); // assumes logoUrl = /uploads/filename.png
  fs.unlink(logoPath, (err) => {
    if (err) {
      console.error(`Error deleting old logo at ${logoPath}: ${err}`);
    } else {
      console.log(`Previous logo at ${logoPath} deleted successfully`);
    }
  });
};

router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const companyName = req.body.company_name || "";
    const headerColor = req.body.header_color || "#fff";
    const footerText = req.body.footer_text || "";
    const footerColor = req.body.footer_color || "#fff";
    const logoUrl = req.file ? `../uploads/${req.file.filename}` : null;

    // Check if record exists
    const result = await query(`SELECT * FROM company_settings WHERE id = 1`);

    if (result.length > 0) {
      // Update existing record
      const oldLogoUrl = result[0].logo_url;

      let sql = `
        UPDATE company_settings 
        SET company_name = ?, header_color = ?, footer_text = ?, footer_color = ?
      `;
      const params = [companyName, headerColor, footerText, footerColor];

      if (logoUrl) {
        sql += `, logo_url = ?`;
        params.push(logoUrl);
      }

      sql += ` WHERE id = 1`;

      await query(sql, params);

      if (logoUrl && oldLogoUrl) {
        deleteOldLogo(oldLogoUrl);
      }

      res.send({ success: true, message: "Company settings updated" });
    } else {
      // Insert new record
      const sql = `
        INSERT INTO company_settings (company_name,logo_url,header_color, footer_text, footer_color) 
        VALUES (?, ?, ?, ?, ?)
      `;
      await query(sql, [
        companyName,
        logoUrl,
        headerColor,
        footerText,
        footerColor,
      ]);
      res.send({ success: true, message: "Company settings created" });
    }
  } catch (err) {
    console.error("Error in POST /company-settings:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
