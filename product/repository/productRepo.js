const Product = require('../model/productModel');
const mongoose = require('mongoose');

const findAllProducts = () => {
    return Product.find()
}

const findProductById = async (id) => {
    return await Product.findById(id);
}

const saveProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save({ runValidators: true });
}

const updateProductById = async (id, updateData) => {
    return await Product.updateOne({ _id: id }, { $set: { ...updateData } }, {
        new: true,
        runValidators: true,
    })
}

const deleteProductById = async (id) => {
    return await Product.deleteOne({ _id: id });
}

const getProductStatistics = async () => {
    return await Product.aggregate([
        {
            $match: { price: { $lte: 40000 } },
        },
        {
            $group: {
                _id: null,
                num: { $sum: 1 },
                minprice: { $min: '$price' },
                maxprice: { $max: '$price' },
            },
        },
    ])
}

const findProductByName = async (name) => {
    const products = await Product.find({
        name: { $regex: name, $options: 'i' } // البحث في الاسم بشكل جزئي (بدون تمييز الحالة)
    })
    .lean(); // لاستخراج نتيجة بدون ميتودات Mongoose

    return products;
};

const getSellerProfit = async (sellerId) => {
    return await Product.aggregate([
        {
            $match: { sellerId: mongoose.Types.ObjectId(sellerId) }
        },
        {
            $group: {
                _id: null,
                totalProfit: { $sum: "$yourEarn" }
            }
        }
    ]);
};

const findProductsBySellerId = async (sellerId) => {
    return await Product.find({ sellerId });
};

module.exports = {
    findAllProducts,
    findProductById,
    saveProduct,
    updateProductById,
    deleteProductById,
    getProductStatistics,
    findProductByName,
    getSellerProfit,
    findProductsBySellerId
};
