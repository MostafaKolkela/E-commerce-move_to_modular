const Favorite = require('../model/favoriteModel.js');

const createFavorite = (userId, productId) => {
  return Favorite.create({ userId, productId });
};

const getFavoritesByUser = (userId) => {
  return Favorite.find({ userId }).populate('productId');
};

const findFavorite = (userId, productId) => {
  return Favorite.findOne({ userId, productId });
};

const deleteFavorite = (userId, productId) => {
  return Favorite.findOneAndDelete({ userId, productId });
};

const existsFavorite = async (userId, productId) => {
  const fav = await Favorite.findOne({ userId, productId });
  return !!fav;
};

module.exports = {
  createFavorite,
  getFavoritesByUser,
  findFavorite,
  deleteFavorite,
  existsFavorite
};
