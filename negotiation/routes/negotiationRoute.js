const router = require('express').Router();
const negotiationController = require('../controller/negotiationController.js');
const verifyToken = require('../../middleware/verifyToken')

router.route('/offer')
    .post(verifyToken, negotiationController.makeOffer)
router.route('/seller/offers')
    .get(verifyToken, negotiationController.getSellerOffers);
router.route('/respond/:id')
    .post(negotiationController.respondToOffer);
router.route('/status/:productId')
    .get(verifyToken, negotiationController.checkStatus);
router.route('/history/:status')
    .get(verifyToken, negotiationController.getNegotiationsByStatus);

module.exports = router;
