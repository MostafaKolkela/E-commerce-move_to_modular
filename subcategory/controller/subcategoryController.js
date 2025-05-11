const SubcategoryService = require("../service/subcategoryService.js");
const catchAsync = require('../../utils/catchAsync.js')

const createSubCategory = catchAsync(
    async(req, res)=>{
        const { name } = req.body;
        const Subcategory = await SubcategoryService.addSubCategory(name);
        res.status(201).json(Subcategory);
    }
)

const getSubCategories = catchAsync(
    async(req, res)=>{
        const Subcategories = await SubcategoryService.listSubCategories();
        res.status(200).json(Subcategories);
    }
)

const deleteSubCategory = catchAsync(
    async(req, res)=>{
        const { id } = req.params;
        await SubcategoryService.removeSubCategory(id);
        res.status(200).json({ message: "SubCategory deleted successfully" });
    }
)

module.exports = { createSubCategory, getSubCategories, deleteSubCategory };
