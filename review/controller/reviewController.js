const reviewService = require('../service/reviewService.js');
const catchAsync = require('../../utils/catchAsync.js')

const addReview = catchAsync(
    async (req, res) => {
        const { productId, message,rate } = req.body;
        const result = await reviewService.addReview(req.user.id, productId, message,rate);
        res.status(201).json(result);
    }
)

const getReviews = catchAsync(
    async (req, res) => {
        const { productId } = req.params;
        const reviews = await reviewService.getReviewsForProduct(productId);
        res.json(reviews);
    }
)

const deleteReview = catchAsync(
    async (req, res) => {
        const { productId } = req.params;
        await reviewService.removeReview(req.user.id, productId);
        res.json({ message: 'Review deleted successfully' });
    }
)

const getRetes = catchAsync(
    async (req, res) => {
        const { productId } = req.params;
        const rates = await reviewService.getProductRates(productId);
        res.json(rates);
    }
)

const getAverageRate = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const result = await reviewService.getProductAverageRate(productId);
  
    res.status(200).json({
        success: true,
        productId,
        averageRate: Number(result.averageRate.toFixed(2)), // مثال: 4.33
        totalReviews: result.totalReviews
      });
  });
  


module.exports = {
    addReview,
    getReviews,
    deleteReview,
    getRetes,
    getAverageRate
}