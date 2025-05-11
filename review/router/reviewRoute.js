const express = require('express');
const router = express.Router();
const controller = require('../controller/reviewController.js');
const verifyToken = require('../../middleware/verifyToken.js')

router.route('/')
    .post(verifyToken, controller.addReview)

router.route('/:productId')
    .get(controller.getReviews)
    .delete(verifyToken, controller.deleteReview)

module.exports = router;
