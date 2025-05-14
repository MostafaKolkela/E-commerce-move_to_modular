const router = require('express').Router();
const negotiationController = require('../controller/negotiationController.js');
const verifyToken = require('../../middleware/verifyToken')

router.route('/offer')
    .post(verifyToken, negotiationController.makeOffer)
router.route('/seller/offers')
    .get(verifyToken, negotiationController.getSellerOffers);
router.route('/respond/:id')
    .post(negotiationController.respondToOffer);

module.exports = router;
