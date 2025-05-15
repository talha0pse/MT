import asyncHandler from 'express-async-handler';
import Trade from '../models/tradeModel.js';

// @desc    Get user's trades
// @route   GET /api/trades
// @access  Private
export const getTrades = asyncHandler(async (req, res) => {
  const trades = await Trade.find({ user: req.user._id });
  res.json(trades);
});

// @desc    Create a new trade
// @route   POST /api/trades
// @access  Private
export const createTrade = asyncHandler(async (req, res) => {
  const { symbol, shares, price } = req.body;

  if (!symbol || !shares || !price) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const trade = new Trade({
    user: req.user._id,
    symbol,
    shares,
    price,
  });

  const createdTrade = await trade.save();
  res.status(201).json(createdTrade);
});
