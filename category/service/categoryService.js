const categoryRepository = require("../repo/categoryRepo.js");
const AppError = require('../../utils/AppError.js')

const addCategory = async (name)=>{
  if (!name) throw new AppError("Category name is required",400);

  const categoryExists = await categoryRepository.findCategoryByName(name);
  if (categoryExists) throw new AppError("Category already exists",400);

  return await categoryRepository.createCategory(name);
}

const listCategories = async ()=>{
  return await categoryRepository.getAllCategories();
}

const removeCategory = async (id)=>{
  const category = await categoryRepository.getCategoryById(id);
  if (!category) throw new AppError("Category not found",404);

  return await categoryRepository.deleteCategory(id);
}

module.exports = { addCategory, listCategories, removeCategory };
