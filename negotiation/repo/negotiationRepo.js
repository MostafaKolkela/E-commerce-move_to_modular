const Negotiation = require('../model/negotiationModel.js');

const create = (data) => Negotiation.create(data);
const findPendingBySeller = (sellerId) =>
  Negotiation.find({ seller: sellerId, status: 'pending' }).populate('product buyer');
const findById = (id) => Negotiation.findById(id);
const updateById = (id, data) => Negotiation.findByIdAndUpdate(id, data, { new: true });

module.exports = { create, findPendingBySeller, findById, updateById };
