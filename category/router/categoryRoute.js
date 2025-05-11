const express = require('express');
const categoryController = require('../controller/categoryController.js')
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken.js')
const verifyRole = require('../../middleware/verifyRole.js')
router.route('/')
    .post(verifyToken,verifyRole("admin"),categoryController.createCategory)
    .get(categoryController.getCategories)
    
router.route('/:id')
    .delete(verifyToken,verifyRole("admin"),categoryController.deleteCategory)

module.exports = router;
