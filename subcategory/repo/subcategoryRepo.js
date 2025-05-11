const SubCategory = require('../model/subcategoryModel.js');

const createSubCategory = (name)=>{
  return SubCategory.create({ name });
}

const findSubCategoryByName = (name)=>{
  return SubCategory.findOne({ name });
}

const getAllSubCategories = ()=> {
  return SubCategory.find();
}

const getSubCategoryById=(id)=> {
  return SubCategory.findById(id);
}

const deleteSubCategory=(id)=> {
  return SubCategory.findByIdAndDelete(id);
}

module.exports = {
  createSubCategory,
  findSubCategoryByName,
  getAllSubCategories,
  getSubCategoryById,
  deleteSubCategory,
};

