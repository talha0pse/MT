import express from 'express';
import authRoutes from './authRoutes.js';
import tradeRoutes from './tradeRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/trades', tradeRoutes);
router.use('/users', userRoutes);

export default router;
