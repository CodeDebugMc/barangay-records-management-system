import mysql from 'mysql2';
import dotenv from 'dotenv';
import { promisify } from 'util';

// MySQL connection pool
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.end()
    .then(() => {
      console.log('Database pool closed.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error closing database pool:', err);
      process.exit(1);
    });
});

// Promisify queries
const query = promisify(db.query).bind(db);

export { db, query };
