const categoryService = require("../service/categoryService.js");
const catchAsync = require('../../utils/catchAsync')

const createCategory = catchAsync(
    async(req, res)=>{
        const { name } = req.body;
        const category = await categoryService.addCategory(name);
        res.status(201).json(category);
    }
)

const getCategories = catchAsync(
    async(req, res)=>{
        const categories = await categoryService.listCategories();
        res.status(200).json(categories);
    }
)

const deleteCategory = catchAsync(
    async(req, res)=>{
        const { id } = req.params;
        await categoryService.removeCategory(id);
        res.status(200).json({ message: "Category deleted successfully" });
    }
)

module.exports = { createCategory, getCategories, deleteCategory };
