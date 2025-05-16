const ApiFeatures = require('../../utils/ApiFeatures')
const AppError = require('../../utils/AppError')
const productRepo = require('../repository/productRepo')

const getAllProducts = async (query) => {
    const Features = new ApiFeatures(productRepo.findAllProducts(), query)
        .Filter()
        .sort()
        .limit()
        .pagination()
    return await Features.query
}

const getSingleProduct = async (id) => {
    const product = await productRepo.findProductById(id)
    if (!product) {
        throw new AppError('there is no product found with this ID', 404)
    }
    return product
}

const addProduct = async (productData, files) => {
    const images = []
    files.forEach(file => {
        images.push(file.path.replace(/\\/g, '/')) // Store file path
    });
    const newproduct = { ...productData, img: images }
    await productRepo.saveProduct(newproduct)
    return {
        ...newproduct,
        img: files.map(file => file.url) // Return complete URLs
    }
}

const updateProduct = async (id, updateData) => {
    return await productRepo.updateProductById(id, updateData)
}

const DeleteProduct = async (id) => {
    return await productRepo.deleteProductById(id)
}

const statistics = async () => {
    return await productRepo.getProductStatistics()
}

const searchProductsByName = async (name) => {
    if (typeof name !== 'string') {
        throw new AppError('Name must be a string', 400);
    }

    return await productRepo.findProductByName(name);
};

const getSellerProfit = async (sellerId) => {
    const profit = await productRepo.getSellerProfit(sellerId);
    return profit[0]?.totalProfit || 0;
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    DeleteProduct,
    statistics,
    searchProductsByName,
    getSellerProfit
}