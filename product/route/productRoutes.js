const express = require('express');
const productController = require('../controller/productController')
const router = express.Router()
const { redisCacheMiddleware } = require('../../middleware/redis');
const verifyToken = require('../../middleware/verifyToken');
const verifyRole = require('../../middleware/verifyRole');
const { uploads, processUpload } = require('../../middleware/multer')
const validateProduct = require('../../middleware/validateProduct')
router.route('/')
    .get(redisCacheMiddleware(), productController.getAllProducts)
    .post(verifyToken, verifyRole("seller", "admin"), uploads.array('img', 7), processUpload, validateProduct, productController.addProduct)

router.route('/statistics')
    .get(productController.statistics)

router.route('/profit')
    .get(verifyToken, verifyRole("seller", "admin"), productController.getSellerProfit);

router.route('/search')
    .get(productController.searchProductsName);


router.route('/my-products')
    .get(verifyToken, productController.getMyProducts);

router.route('/:id')
    .get(productController.getSingleProduct)
    .patch(verifyToken, verifyRole("seller", "admin"), productController.updateProduct)
    .delete(verifyToken, verifyRole("seller", "admin"), productController.DeleteProduct)

module.exports = router;

