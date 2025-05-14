const Review = require('../model/reviewModel.js');
const User = require('../../User/model/userModel.js')
const mongoose =require('mongoose')
const createReview = (userId, productId, message,rate) => {
  return Review.create({ userId, productId, message,rate });
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

const getProductRates = (productId)=>{
  return Review.find({ productId }).select('rate').populate('_id');
}

const getAverageRate = async (productId) => {
  // تأكد إن الـ ID صالح
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid productId');
  }

  const result = await Review.aggregate([
    {
      $match: {
        productId: new mongoose.Types.ObjectId(productId)
      }
    },
    {
      $group: {
        _id: '$productId',
        averageRate: { $avg: '$rate' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  // لو مفيش تقييمات بيرجع 0
  return result[0] || { averageRate: 0, totalReviews: 0 };
};


module.exports = {
  createReview,
  getReviewsByProduct,
  getReviewByUserAndProduct,
  deleteReview,
  getProductRates,
  getAverageRate
};
