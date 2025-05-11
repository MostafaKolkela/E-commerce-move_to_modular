const Review = require('../model/reviewModel.js');
const User = require('../../User/model/userModel.js')

const createReview = (userId, productId, message) => {
  return Review.create({ userId, productId, message });
};

const getReviewsByProduct = (productId) => {
  return Review.find({ productId }).populate('_id');
};

const getReviewByUserAndProduct = (userId, productId) => {
  return Review.findOne({ userId, productId });
};

const deleteReview = (userId, productId) => {
  return Review.findOneAndDelete({ userId, productId });
};

module.exports = {
  createReview,
  getReviewsByProduct,
  getReviewByUserAndProduct,
  deleteReview,
};
