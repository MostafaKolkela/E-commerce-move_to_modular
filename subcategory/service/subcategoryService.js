const SubcategoryRepository = require("../repo/subcategoryRepo.js");
const AppError = require('../../utils/AppError.js')

const addSubCategory = async (name)=>{
  if (!name) throw new AppError("SubCategory name is required",400);

  const SubcategoryExists = await SubcategoryRepository.findSubCategoryByName(name);
  if (SubcategoryExists) throw new AppError("SubCategory already exists",400);

  return await SubcategoryRepository.createSubCategory(name);
}

const listSubCategories = async ()=>{
  return await SubcategoryRepository.getAllSubCategories();
}

const removeSubCategory = async (id)=>{
  const Subcategory = await SubcategoryRepository.getSubCategoryById(id);
  if (!Subcategory) throw new AppError("SubCategory not found",404);

  return await SubcategoryRepository.deleteSubCategory(id);
}

module.exports = { addSubCategory, listSubCategories, removeSubCategory };
