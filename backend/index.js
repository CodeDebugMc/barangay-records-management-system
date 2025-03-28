import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import multer from 'multer';
import fs from 'fs';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'earist_hris',
});

// Database connection.
db.connect((err) => {
  if (err) throw err;
  console.log('Database Connected');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
