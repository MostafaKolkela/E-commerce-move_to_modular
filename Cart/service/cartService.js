const AppError = require('../../utils/AppError');
const CartRepo = require('../repository/cartRepo')

const totalprice = (cart) => {
    let totalprice = 0;
    cart.cartItem.forEach(item => {
        // التأكد من وجود discount في بيانات المنتج بعد populate
        let discountPercent = 0;
        if (item.productId && typeof item.productId === 'object' && item.productId.discount !== undefined && item.productId.discount !== null) {
            discountPercent = Number(item.productId.discount) || 0;
        }
        // حساب السعر بعد الخصم كنسبة مئوية
        const priceAfterDiscount = item.price * (1 - (discountPercent / 100));
        const finalPrice = priceAfterDiscount > 0 ? priceAfterDiscount : 0;
        totalprice += finalPrice * item.quantity;
        // طباعة معلومات العنصر
        console.log(`ProductId: ${item.productId._id || item.productId}, Price: ${item.price}, Discount(%): ${discountPercent}, Qty: ${item.quantity}, Subtotal: ${finalPrice * item.quantity}`);
    });
    console.log('Total price (with percent discount if exists):', totalprice);
    return cart.totalprice = totalprice;
}


const getcart = async(id) =>{
    const cart = await CartRepo.FindCart(id)
    if(cart)
        {
            // طباعة الخصم لكل عنصر في السلة عند استرجاع السلة
            cart.cartItem.forEach(item => {
                let discount = 0;
                if (item.productId && typeof item.productId === 'object' && item.productId.discount !== undefined && item.productId.discount !== null) {
                    discount = Number(item.productId.discount) || 0;
                }
                console.log(`ProductId: ${item.productId._id || item.productId}, Discount in getcart: ${discount}`);
            });
            // إعادة حساب التوتال مع الخصم وتحديثه في الكارت قبل الإرجاع
            cart.totalPrice = totalprice(cart);
            return cart
        }
    throw new AppError ('no cart found for this user!' , 404)
}

// const addToCart = async(productId , quantity,id,sellerId) => {

//     let cart = await CartRepo.FindCart(id)
//     if(!cart)cart = await CartRepo.createCart(id)

//     const product = await CartRepo.FindProductById(productId)
//     if(!product)throw new AppError('product not found',404)
        
//     const itemexist =  cart.cartItem.find((item) =>{
//         return item.productId == productId;
//     })

//     if(itemexist)
//         {
//             itemexist.quantity +=quantity
//             itemexist.price = product.price
//             cart.totalPrice = totalprice(cart)
//         }

//     else{
//         cart.cartItem.push({productId , quantity,price : product.price,sellerId})
//     }
//     cart.totalPrice = totalprice(cart)
//     await CartRepo.saveCart(cart);
//     return cart
// }

const addToCart = async(productId, quantity, userId, sellerId) => {
    let cart = await CartRepo.FindCart(userId);
    if(!cart) cart = await CartRepo.createCart(userId);

    const product = await CartRepo.FindProductById(productId);
    console.log('PRODUCT FROM DB:', product); // debug
    if(!product) throw new AppError('product not found', 404);
    
    // مرونة في المقارنة بين productId في كل الحالات
    const item = cart.cartItem.find(item => {
        const id1 = item.productId && item.productId._id ? item.productId._id.toString() : item.productId.toString();
        return id1 === product._id.toString();
    });

    if(item) {
        item.quantity += quantity;
        // خزّن قيمة الخصم الحالية للمنتج (دائمًا رقم)
        item.discount = product.discount !== undefined ? product.discount : (product.discount === 0 ? 0 : 0);
        item.price = product.price;
        if (!item.isNegotiated) {
            item.originalPrice = product.price;
        }
        console.log('ADD TO CART (update):', {discount: item.discount, price: item.price, product});
    } else {
        cart.cartItem.push({
            productId: product._id,
            quantity,
            price: product.price, // السعر الأصلي
            sellerId,
            discount: product.discount !== undefined ? product.discount : (product.discount === 0 ? 0 : 0)
        });
        console.log('ADD TO CART (new):', {discount: product.discount, price: product.price, product});
    }

    cart.totalPrice = totalprice(cart);
    await CartRepo.saveCart(cart);
    return cart;
};


const removeitem = async (userId , productId)=>{
        const cart = await CartRepo.FindCart(userId)
        if(!cart)
            {
                throw new AppError ('no cart found for this user!' , 404)
            }
        else{
            cart.cartItem = cart.cartItem.filter(item =>{
               return !item.productId.equals(productId)
            })
            cart.totalPrice = totalprice(cart)
            await CartRepo.saveCart(cart)
            return cart
        }
}

const updeteQuantity = async (userId , productId , quantity) =>{

    const cart = await CartRepo.FindCart(userId)
    if(!cart)throw new AppError ('no cart found for this user!' , 404)

    const item = cart.cartItem.find(item =>item.productId._id.toString() === productId)
    if (!item) throw new AppError('Item not found in cart!', 404)

    item.quantity = quantity
    cart.totalPrice = totalprice(cart)
    await CartRepo.saveCart(cart)
    return cart
}

const updateCartItemPrice = async (userId, productId, newPrice, negotiationId = null) => {
    const cart = await CartRepo.FindCart(userId)
    if (!cart) throw new AppError('No cart found for this user!', 404)

    const item = cart.cartItem.find(item => item.productId._id.toString() === productId)
    if (!item) throw new AppError('Product not found in cart!', 404)

    item.price = newPrice
    if (negotiationId) {
        item.negotiationId = negotiationId
    }

    cart.totalPrice = totalprice(cart)
    await CartRepo.saveCart(cart)
    return cart
}


module.exports = {
    getcart,
    addToCart,
    removeitem,
    updeteQuantity,
    updateCartItemPrice
}