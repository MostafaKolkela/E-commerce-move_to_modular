const favoriteRepo = require('../repository/favoriteRepo.js');

const getFavoritesByUser = async (userId) => {
  return await favoriteRepo.getFavoritesByUser(userId);
};

const addToFavorites = async (userId, productId) => {
  const exists = await favoriteRepo.findFavorite(userId, productId);
  if (exists) throw new Error('Already in favorites');
  return await favoriteRepo.createFavorite(userId, productId);
};

const removeFromFavorites = async (userId, productId) => {
  const deleted = await favoriteRepo.deleteFavorite(userId, productId);
  if (!deleted) throw new Error('Not found in favorites');
  return deleted;
};

const toggleFavorite = async (userId, productId) => {
  const exists = await favoriteRepo.findFavorite(userId, productId);
  if (exists) {
    await favoriteRepo.deleteFavorite(userId, productId);
    return { toggled: 'removed' };
  } else {
    await favoriteRepo.createFavorite(userId, productId);
    return { toggled: 'added' };
  }
};

const checkFavorite = async (userId, productId) => {
  return await favoriteRepo.existsFavorite(userId, productId);
};

module.exports = {
    getFavoritesByUser,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    checkFavorite
}