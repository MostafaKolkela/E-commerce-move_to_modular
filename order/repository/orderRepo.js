const Cart = require('../../Cart/model/cartModel')
const Order = require('../model/ordermodel')
const Product = require('../../product/model/productModel')
const User = require('../../User/model/userModel.js')
const AppError = require('../../utils/AppError.js')
const FindCart = async(userId)=>{
    return await Cart.findOne({userId}).populate('cartItem.productId')
}

const createoreder = async(orderData)=>{
    const order = new Order({...orderData})
    return await order.save()
}

const FindProductById = async(id)=>{
    return await Product.findById(id)
}

const saveProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save({ runValidators: true });
}

const findCartAndUpdate = async(userId)=>{
    return await Cart.findOneAndUpdate({ userId }, { cartItem: [], totalPrice: 0 });
}

const getOrdersByid = async(userId)=>{
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return orders
}
const getSellerOrdersByid = async(userId)=>{
    const orders = await Order.find({ sellerId: userId });
    return orders
}

const FindSellerById = async (sellerId) => {
    const user = await User.findById(sellerId);
    // if (user.role !== 'seller'||'admin') {
    //     throw new AppError('Seller invalid role', 404);
    // }
    if (!user) {
        throw new AppError('Seller not found', 404);
    }
    return user;
};


const saveSeller = async (user) => {
    return await user.save();
};

module.exports = {
    FindCart,
    createoreder,
    FindProductById,
    saveProduct,
    findCartAndUpdate,
    getOrdersByid,
    getSellerOrdersByid,
    FindSellerById,
    saveSeller
}