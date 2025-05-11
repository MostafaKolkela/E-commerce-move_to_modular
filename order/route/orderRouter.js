const express = require('express')
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken')

const orderControllers = require('../../order/controller/orderControllers')


router.route('/')
            .post(verifyToken,orderControllers.creatOrder)
            .get(verifyToken,orderControllers.getUserOrders)
router.route('/seller')
            .get(verifyToken,orderControllers.getSellerOrders)


module.exports = router