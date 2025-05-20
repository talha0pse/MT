import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import tradeRoutes from './routes/tradeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// ✅ Allow CORS from local and deployed frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://frontend-ej7by9eum-talhas-projects-20fd8be5.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Apply rate limiter
app.use(apiLimiter);

// ✅ API routes
app.use('/api/trades', tradeRoutes);
app.use('/api/users', userRoutes);

// ✅ Error handlers
app.use(notFound);
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
