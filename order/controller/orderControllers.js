const Cart = require('../../Cart/model/cartModel')
const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/AppError')
const Order = require('../model/ordermodel')
const Product = require('../../product/model/productModel')
const orederService = require('../service/orderService')

const creatOrder = catchAsync(async(req,res,next)=>{
    const order = await orederService.creatOrder(req.body.shippingAddress,req.body.paymentMethod,req.user._id,req.body.sellerId)
    return res.json({
        success : true,
        data : order
    })
})

const getUserOrders = catchAsync(async(req,res,next)=>{
    const userId = req.user._id
    if(!userId) throw new AppError('token is required' , 404)
    const orders = await orederService.getUserOrders(userId)
    return res.json({
        success:true,
        data: orders
    })

})

const getSellerOrders = catchAsync(async(req,res,next)=>{
    const userId = req.user._id
    if(!userId) throw new AppError('token is required' , 404)
    const orders = await orederService.getSellerOrders(userId)
    return res.json({
        success:true,
        data: orders
    })

})

module.exports = {
    creatOrder,
    getUserOrders,
    getSellerOrders
}