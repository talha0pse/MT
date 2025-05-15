//MT\backend\testMongo.js

import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();
