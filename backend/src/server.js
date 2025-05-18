import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Add this line
import connectDB from './config/db.js';
import tradeRoutes from './routes/tradeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// ✅ Allow requests from frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(apiLimiter);

app.use('/api/trades', tradeRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
