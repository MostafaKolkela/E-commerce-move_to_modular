const Cart = require('../../Cart/model/cartModel')
const AppError = require('../../utils/AppError')
const Order = require('../model/ordermodel')
const Product = require('../../product/model/productModel')
const orderRepo = require('../repository/orderRepo')

const creatOrder = async (shippingAddress, paymentMethod, userId, sellerId) => {
    const cart = await orderRepo.FindCart(userId);
    if (!cart) throw new AppError('your cart is empty!', 404);

    const totalPrice = cart.totalPrice;
    const order = {
        userId,
        items: cart.cartItem,
        totalPrice,
        shippingAddress,
        paymentMethod,
        sellerId // استخدم الـ userId هنا بدل sellerId
    };
    await orderRepo.createoreder(order);

    let sellerProfit = 0;

    for (const el of cart.cartItem) {
        const product = await orderRepo.FindProductById(el.productId);
        if (product) {
            product.stock_quantity -= el.quantity;

            // احسب الربح من كل منتج
            sellerProfit += el.quantity * product.price;

            await orderRepo.saveProduct(product);
        }
    }

    // هات البياع وعدل قيمة التوتال بروفيت بتاعه
    const seller = await orderRepo.FindSellerById(sellerId);  // استخدم userId هنا
    if (seller) {
        seller.totalProfit += sellerProfit;
        await orderRepo.saveSeller(seller);
    }

    await orderRepo.findCartAndUpdate(userId);

    return order;
};



const getUserOrders = async(userId)=>{
    const orders = await orderRepo.getOrdersByid(userId)
    if(!orders) throw new AppError('no orders found' , 404)
    return orders
}

const getSellerOrders = async(userId)=>{
    const orders = await orderRepo.getSellerOrdersByid(userId)
    if(!orders) throw new AppError('no orders found' , 404)
    return orders
}

module.exports = {
    creatOrder,
    getUserOrders,
    getSellerOrders
}