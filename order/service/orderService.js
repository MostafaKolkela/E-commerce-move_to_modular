const Cart = require('../../Cart/model/cartModel')
const AppError = require('../../utils/AppError')
const Order = require('../model/ordermodel')
const Product = require('../../product/model/productModel')
const orderRepo = require('../repository/orderRepo')

const creatOrder = async (shippingAddress, paymentMethod, userId) => {
    const cart = await orderRepo.FindCart(userId);
    if (!cart) throw new AppError('your cart is empty!', 404);

    const totalPrice = cart.totalPrice;
    const order = {
        userId,
        items: cart.cartItem,
        totalPrice,
        shippingAddress,
        paymentMethod
        // ملناش دعوة بـ sellerId هنا، لأنه في كل منتج لوحده
    };
    await orderRepo.createoreder(order);

    // object لتجميع أرباح كل بياع
    const sellerProfits = {};

    for (const el of cart.cartItem) {
        const product = await orderRepo.FindProductById(el.productId);
        if (product) {
            product.stock_quantity -= el.quantity;

            const sellerId = product.sellerId;
            const profit = el.quantity * product.price;

            // اجمع الربح لكل بياع
            if (!sellerProfits[sellerId]) {
                sellerProfits[sellerId] = 0;
            }
            sellerProfits[sellerId] += profit;

            await orderRepo.saveProduct(product);
        }
    }

    // عدّل أرباح كل بياع مره واحده
    for (const sellerId in sellerProfits) {
        const seller = await orderRepo.FindSellerById(sellerId);
        if (seller) {
            seller.totalProfit += sellerProfits[sellerId];
            await orderRepo.saveSeller(seller);
        }
    }

    // فضي السلة
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