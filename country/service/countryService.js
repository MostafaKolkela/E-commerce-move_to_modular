const CountryRepository = require("../repo/countryRepo.js");
const AppError = require('../../utils/AppError.js')

const addCountry = async (name)=>{
  if (!name) throw new AppError("Country name is required",400);

  const Country = await CountryRepository.findCountryByName(name);
  if (Country) throw new AppError("Country already exists",400);

  return await CountryRepository.createCountry(name);
}

const listCountry = async ()=>{
  return await CountryRepository.getAllCountries();
}

const removeCountry = async (id)=>{
  const Country = await CountryRepository.getCountryById(id);
  if (!Country) throw new AppError("Country not found",404);

  return await CountryRepository.deleteCountry(id);
}

module.exports = { addCountry, listCountry, removeCountry };
