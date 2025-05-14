const reviewRepo = require('../repo/reviewRepo.js');
const AppError = require('../../utils/AppError.js')
const Product = require('../../product/repository/productRepo.js')
const addReview = async (userId, productId, message,rate) => {
  const existingReview = await reviewRepo.getReviewByUserAndProduct(userId, productId);
  if (existingReview) throw new Error('You have already reviewed this product');
  await reviewRepo.createReview(userId, productId, message, rate);

  // بعد إنشاء التقييم، نحسب المتوسط الجديد
  const result = await reviewRepo.getAverageRate(productId); // زي ما عملنا قبل

  // حدث المنتج
  await Product.updateProductById(productId, {
    averageRate: result.averageRate,
    totalReviews: result.totalReviews
  });

  return {
    success: true,
    msg: 'Review added and product updated'
  };
};

const getReviewsForProduct = async (productId) => {
  return await reviewRepo.getReviewsByProduct(productId);
};

const removeReview = async (userId, productId) => {
  const deletedReview = await reviewRepo.deleteReview(userId, productId);
  if (!deletedReview) throw new Error('Review not found');
  return { message: 'Review deleted successfully' };
};

const getProductRates = async(productId)=>{
  return await reviewRepo.getProductRates(productId);
}

const getProductAverageRate = async (productId) => {
  return await reviewRepo.getAverageRate(productId);
};


module.exports = {
  addReview,
  getReviewsForProduct,
  removeReview,
  getProductRates,
  getProductAverageRate
}