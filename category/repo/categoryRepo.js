const Category = require('../model/categoryModel.js');

const createCategory = (name)=>{
  return Category.create({ name });
}

const findCategoryByName = (name)=>{
  return Category.findOne({ name });
}

const getAllCategories = ()=> {
  return Category.find();
}

const getCategoryById=(id)=> {
  return Category.findById(id);
}

const deleteCategory=(id)=> {
  return Category.findByIdAndDelete(id);
}

module.exports = {
  createCategory,
  findCategoryByName,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};

