import express from 'express';
import { getTrades, createTrade } from '../controllers/tradeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTrades)
  .post(protect, createTrade);

export default router;
