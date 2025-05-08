import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import tradeRoutes from './routes/tradeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { apiLimiter } from './middleware/rateLimiter.js'; // ✅ import

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(apiLimiter); // ✅ global rate limiter

app.use('/api/trades', tradeRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
