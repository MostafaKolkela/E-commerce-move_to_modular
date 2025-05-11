const Country = require('../model/countryModel.js');

const createCountry = (name)=>{
  return Country.create({ name });
}

const findCountryByName = (name)=>{
  return Country.findOne({ name });
}

const getAllCountries = ()=> {
  return Country.find();
}

const getCountryById=(id)=> {
  return Country.findById(id);
}

const deleteCountry=(id)=> {
  return Country.findByIdAndDelete(id);
}

module.exports = {
  createCountry,
  findCountryByName,
  getAllCountries,
  getCountryById,
  deleteCountry,
};

