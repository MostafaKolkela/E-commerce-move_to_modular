const CountryService = require("../service/countryService.js");
const catchAsync = require('../../utils/catchAsync.js')

const createCountry = catchAsync(
    async(req, res)=>{
        const { name } = req.body;
        const Country = await CountryService.addCountry(name);
        res.status(201).json(Country);
    }
)

const getCountry = catchAsync(
    async(req, res)=>{
        const Country = await CountryService.listCountry();
        res.status(200).json(Country);
    }
)

const deleteCountry = catchAsync(
    async(req, res)=>{
        const { id } = req.params;
        await CountryService.removeCountry(id);
        res.status(200).json({ message: "Country deleted successfully" });
    }
)

module.exports = { createCountry, getCountry, deleteCountry };
