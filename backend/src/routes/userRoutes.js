import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Test route
// @route   GET /api/users/test
// @access  Public
router.get('/test', (req, res) => {
  res.send('Users route working fine!');
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  if (req.user) {
    const { _id, name, email } = req.user;
    res.json({ _id, name, email });
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
});

export default router;
