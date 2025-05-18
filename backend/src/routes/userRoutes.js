import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { registerUser, authUser } from '../controllers/userController.js';

const router = express.Router();

// @desc    Register
// @route   POST /api/users/register
router.post('/register', registerUser);

// @desc    Login
// @route   POST /api/users/login
router.post('/login', authUser);

// @desc    Test route
router.get('/test', (req, res) => {
  res.send('Users route working fine!');
});

// @desc    Get user profile
router.get('/profile', protect, async (req, res) => {
  if (req.user) {
    const { _id, name, email } = req.user;
    res.json({ _id, name, email });
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
});

export default router;
