const Cart = require('../model/cartModel')
const Product = require('../../product/model/productModel')


const FindCart = async(userId)=>{
    return await Cart.findOne({userId}).populate('cartItem.productId')
}

const createCart = async(userId)=>{
    return Cart.create({userId , cartItem :[]})
}

const FindProductById = async(id)=>{
    // جلب كل الحقول للتأكد من وصول الخصم
    return await Product.findById(id);
}

const saveCart = async(cart)=>{
    return await cart.save()
}
module.exports = {
    FindCart,
    createCart,
    FindProductById,
    saveCart
}