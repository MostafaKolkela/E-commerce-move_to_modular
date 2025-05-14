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

module.exports = { makeOffer, getSellerOffers, respondToOffer };
