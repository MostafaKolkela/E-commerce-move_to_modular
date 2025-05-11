const express = require('express');
const SubcategoryController = require('../controller/subcategoryController.js')
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken.js')
const verifyRole = require('../../middleware/verifyRole.js')
router.route('/')
    .post(verifyToken,verifyRole("admin"),SubcategoryController.createSubCategory)
    .get(SubcategoryController.getSubCategories)
    
router.route('/:id')
    .delete(verifyToken,verifyRole("admin"),SubcategoryController.deleteSubCategory)

module.exports = router;
