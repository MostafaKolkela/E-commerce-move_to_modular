const Negotiation = require('../model/negotiationModel.js');
const Cart = require('../../Cart/model/cartModel.js');

const makeOffer = async (userId, { productId, price }) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error('Cart not found');

  const cartItem = cart.cartItem.find(item => item.productId.toString() === productId);
  if (!cartItem) throw new Error('Product not in cart');

  const newNegotiation = await Negotiation.create({
    buyer: userId,
    seller: cartItem.sellerId,
    product: productId,
    cartItemId: cartItem._id,
    offeredPrice: price,
    status: 'pending'
  });

  return newNegotiation;
};

const getSellerOffers = async (sellerId) => {
    return await Negotiation.find({
      seller: sellerId,
      status: 'pending'
    }).populate('product buyer seller');
  };
  

  

const respondToOffer = async (offerId, response, counterPrice = null) => {
  const offer = await Negotiation.findById(offerId);
  if (!offer) throw new Error('Offer not found');

  if (response === 'accept') {
    offer.status = 'accepted';
    await updateCartItemPrice(offer.buyer, offer.cartItemId, offer.offeredPrice);
  } else if (response === 'reject') {
    offer.status = 'rejected';
  } else if (response === 'counter') {
    offer.status = 'countered';
    offer.sellerCounterPrice = counterPrice;
    await updateCartItemPrice(offer.buyer, offer.cartItemId, counterPrice);
  }

  await offer.save();
  return offer;
};

const updateCartItemPrice = async (userId, cartItemId, newPrice) => {
  await Cart.updateOne(
    { userId, 'cartItem._id': cartItemId },
    { $set: { 'cartItem.$.price': newPrice } }
  );
};

const checkNegotiationStatus = async (userId, productId) => {
  // التحقق من وجود المنتج في سلة المستخدم
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error('Cart not found');
  }

  // البحث عن المنتج في سلة المشتريات
  const cartItem = cart.cartItem.find(item => item.productId.toString() === productId);
  if (!cartItem) {
    throw new Error('Product not found in cart');
  }

  // البحث عن آخر عملية تفاوض للمنتج مع هذا المستخدم
  const negotiation = await Negotiation.findOne({
    buyer: userId,
    product: productId
  }).sort({ _id: -1 }); // ترتيب تنازلي للحصول على أحدث تفاوض

  if (!negotiation) {
    return {
      exists: false,
      message: 'No negotiation found for this product'
    };
  }

  return {
    status: negotiation.status
  };
};

const getNegotiationsByStatus = async (userId, status) => {
  // Get user to check role
  const user = await require('../../User/model/userModel').findById(userId);
  if (!user) throw new Error('User not found');

  let query;
  if (user.role === 'seller') {
    // If seller, get all offers received
    query = {
      seller: userId,
      status: status
    };
  } else {
    // If buyer, get all offers made
    query = {
      buyer: userId,
      status: status
    };
  }

  const negotiations = await Negotiation.find(query)
    .populate({
      path: 'product',
      select: 'name price img description'
    })
    .populate({
      path: 'buyer',
      select: 'firstName lastName email avatar'
    })
    .populate({
      path: 'seller',
      select: 'firstName lastName email avatar'
    })
    .sort({ _id: -1 }); // Get newest first

  return {
    count: negotiations.length,
    negotiations: negotiations.map(neg => ({
      id: neg._id,
      productName: neg.product.name,
      productImage: neg.product.img[0],
      originalPrice: neg.product.price,
      offeredPrice: neg.offeredPrice,
      counterPrice: neg.sellerCounterPrice,
      status: neg.status,
      date: neg._id.getTimestamp(),
      buyer: {
        id: neg.buyer._id,
        name: `${neg.buyer.firstName} ${neg.buyer.lastName}`,
        avatar: neg.buyer.avatar,
        email: neg.buyer.email
      },
      seller: {
        id: neg.seller._id,
        name: `${neg.seller.firstName} ${neg.seller.lastName}`,
        avatar: neg.seller.avatar,
        email: neg.seller.email
      }
    }))
  };
};

module.exports = { 
    makeOffer,
    getSellerOffers,
    respondToOffer,
    checkNegotiationStatus,
    getNegotiationsByStatus
};
