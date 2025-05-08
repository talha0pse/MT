import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import * as Sentry from '@sentry/node';
import statusMonitor from 'express-status-monitor';
import indexRoutes from './routes/index.js';

dotenv.config();

// Create Express app first
const app = express();

// Initialize Sentry BEFORE other middleware
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    Sentry.expressIntegration(app), // This handles request/error tracking
  ],
  tracesSampleRate: 1.0,
});

// Connect to MongoDB
connectDB();

// Middleware (NO explicit Sentry.Handlers needed)
app.use(statusMonitor());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', indexRoutes);

// Error handling
app.use((err, req, res, next) => {
  Sentry.captureException(err);
  res.status(err.statusCode || 500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

export default app;