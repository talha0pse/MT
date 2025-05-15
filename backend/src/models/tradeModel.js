import mongoose from 'mongoose';

const tradeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  symbol: {
    type: String,
    required: true
  },
  shares: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  tradeDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Trade = mongoose.model('Trade', tradeSchema);

export default Trade;
