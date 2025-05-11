const BrandRepository = require("../repo/brandRepo.js");
const AppError = require('../../utils/AppError.js')

const addBrand = async (name)=>{
  if (!name) throw new AppError("Brand name is required",400);

  const Brand = await BrandRepository.findBrandByName(name);
  if (Brand) throw new AppError("Brand already exists",400);

  return await BrandRepository.createBrand(name);
}

const listBrand = async ()=>{
  return await BrandRepository.getAllBrands();
}

const removeBrand = async (id)=>{
  const Brand = await BrandRepository.getBrandById(id);
  if (!Brand) throw new AppError("Brand not found",404);

  return await BrandRepository.deleteBrand(id);
}

module.exports = { addBrand, listBrand, removeBrand };
