const catchAsync = require('../../utils/catchAsync')
const productService = require('../service/productService')

const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await productService.getAllProducts(req.query)
    console.log('without cache')
    res.json({
        status: "success",
        result: products.length,
        data: products
    });
})

const getSingleProduct = catchAsync(async (req, res, next) => {
    const product = await productService.getSingleProduct(req.params.id)
    res.json({
        status: "success",
        data: product
    })
})

const addProduct = catchAsync(async (req, res, next) => {
    const newproduct = await productService.addProduct(req.body, req.files)
    res.status(201).json({
        status: "success",
        data: newproduct
    })
})

const updateProduct = catchAsync(async (req, res, next) => {
    const product = await productService.updateProduct(req.params.id, req.body)
    return res.status(200).json({
        status: "success",
        data: product
    })
})

const DeleteProduct = catchAsync(async (req, res, next) => {
    const data = await productService.DeleteProduct(req.params.id)
    res.json({ success: true, msg: data })
})

const statistics = catchAsync(async (req, res, next) => {
    const statistics = await productService.statistics()
    return res.json({
        status: 'success',
        data: statistics
    })
})

const searchProductsName = catchAsync(async (req, res, next) => {
    console.log("Query params:", req.query);
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ message: 'Name query parameter is required' });
    }

    const products = await productService.searchProductsByName(name);

    if (products.length === 0) {
        return res.status(404).json({ message: 'No products found matching the name' });
    }

    res.status(200).json({ success: true, data: products });

});

const getSellerProfit = catchAsync(async (req, res, next) => {
    const profit = await productService.getSellerProfit(req.user._id);
    res.status(200).json({
        status: 'success',
        data: {
            totalProfit: profit
        }
    });
});

const getMyProducts = catchAsync(async (req, res, next) => {
    const products = await productService.getProductsBySeller(req.user._id);
    res.status(200).json({
        status: "success",
        data: products
    });
});

module.exports = {
    getAllProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    DeleteProduct,
    statistics,
    searchProductsName,
    getSellerProfit,
    getMyProducts
}
