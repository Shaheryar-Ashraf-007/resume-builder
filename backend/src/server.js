import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import resumeRoutes from './routes/resume.route.js';
import cors from 'cors';

dotenv.config();
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Serve static files for uploads
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});