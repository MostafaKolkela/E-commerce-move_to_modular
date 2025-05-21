const mongoose = require('mongoose');

const negotiationSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  cartItemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  offeredPrice: { type: Number, required: true },
  sellerCounterPrice: { type: Number, default: null },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'countered'],
    default: 'pending'
  }
});
negotiationSchema.index({ buyer: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Negotiation', negotiationSchema);
