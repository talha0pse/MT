import express from 'express';
import { getTrades, createTrade } from '../controllers/tradeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { apiLimiter } from '../middleware/rateLimiter.js';  // ✅ import rate limiter

const router = express.Router();

router.route('/')
  .get(protect, apiLimiter, getTrades)   // ✅ rate limit applied
  .post(protect, apiLimiter, createTrade);  // ✅ rate limit applied

export default router;
