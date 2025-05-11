const Brand = require('../model/brandModel.js');

const createBrand = (name)=>{
  return Brand.create({ name });
}

const findBrandByName = (name)=>{
  return Brand.findOne({ name });
}

const getAllBrands = ()=> {
  return Brand.find();
}

const getBrandById=(id)=> {
  return Brand.findById(id);
}

const deleteBrand=(id)=> {
  return Brand.findByIdAndDelete(id);
}

module.exports = {
  createBrand,
  findBrandByName,
  getAllBrands,
  getBrandById,
  deleteBrand,
};

