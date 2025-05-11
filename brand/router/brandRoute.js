const express = require('express');
const BrandController = require('../controller/brandController.js')
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken.js')
const verifyRole = require('../../middleware/verifyRole.js')
router.route('/')
    .post(verifyToken,verifyRole("admin"),BrandController.createBrand)
    .get(BrandController.getBrand)
    
router.route('/:id')
    .delete(verifyToken,verifyRole("admin"),BrandController.deleteBrand)

module.exports = router;
