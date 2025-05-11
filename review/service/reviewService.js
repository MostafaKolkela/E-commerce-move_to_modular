const reviewRepo = require('../repo/reviewRepo.js');

const addReview = async (userId, productId, message) => {
  const existingReview = await reviewRepo.getReviewByUserAndProduct(userId, productId);
  if (existingReview) throw new Error('You have already reviewed this product');
  return await reviewRepo.createReview(userId, productId, message);
};

const getReviewsForProduct = async (productId) => {
  return await reviewRepo.getReviewsByProduct(productId);
};

const removeReview = async (userId, productId) => {
  const deletedReview = await reviewRepo.deleteReview(userId, productId);
  if (!deletedReview) throw new Error('Review not found');
  return { message: 'Review deleted successfully' };
};

module.exports = {
  addReview,
  getReviewsForProduct,
  removeReview
}