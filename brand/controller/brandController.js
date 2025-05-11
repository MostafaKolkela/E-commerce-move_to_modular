const BrandService = require("../service/brandService.js");
const catchAsync = require('../../utils/catchAsync.js')

const createBrand = catchAsync(
    async(req, res)=>{
        const { name } = req.body;
        const Brand = await BrandService.addBrand(name);
        res.status(201).json(Brand);
    }
)

const getBrand = catchAsync(
    async(req, res)=>{
        const Brand = await BrandService.listBrand();
        res.status(200).json(Brand);
    }
)

const deleteBrand = catchAsync(
    async(req, res)=>{
        const { id } = req.params;
        await BrandService.removeBrand(id);
        res.status(200).json({ message: "Brand deleted successfully" });
    }
)

module.exports = { createBrand, getBrand, deleteBrand };
