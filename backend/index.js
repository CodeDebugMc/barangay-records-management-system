import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import leaveRoutes from './routes/leaveRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import registerRoutes from './routes/registerRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/leave', leaveRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
