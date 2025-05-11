const express = require('express');
const router = express.Router();
const controller = require('../controller/favoriteController.js');
const verifyToken = require('../../middleware/verifyToken.js')

router.route('/')
    .get(verifyToken,controller.getFavorites)
    .post(verifyToken, controller.addFavorite)
    .delete(verifyToken, controller.removeFavorite)
router.route('/toggle')
    .post(verifyToken, controller.toggleFavorite)
router.route('/check/:productId')
    .get(verifyToken, controller.checkFavorite)

module.exports = router;
