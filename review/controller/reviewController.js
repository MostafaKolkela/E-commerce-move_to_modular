const reviewService = require('../service/reviewService.js');
const catchAsync = require('../../utils/catchAsync.js')

const addReview = catchAsync(
    async (req, res) => {
        const { productId, message } = req.body;
        const result = await reviewService.addReview(req.user.id, productId, message);
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

module.exports = {
    addReview,
    getReviews,
    deleteReview
}