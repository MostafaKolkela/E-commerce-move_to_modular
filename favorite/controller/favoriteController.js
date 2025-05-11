const favoriteService = require('../service/favoriteService.js');
const catchAsync = require('../../utils/catchAsync.js')

const getFavorites = catchAsync(
    async (req, res) => {
        const favorites = await favoriteService.getFavoritesByUser(req.user.id);
        res.status(201).json(favorites);
    }
)

const addFavorite = catchAsync(
    async (req, res) => {
        const { productId } = req.body;
        const result = await favoriteService.addToFavorites(req.user.id, productId);
        res.status(201).json(result);
    }
)

const removeFavorite = catchAsync(
    async (req, res) => {
        const { productId } = req.body;
        await favoriteService.removeFromFavorites(req.user.id, productId);
        res.status(201).json({ message: 'Removed from favorites' });
    }
    
)

const toggleFavorite = catchAsync(
    async (req, res) => {
        const { productId } = req.body;
        const result = await favoriteService.toggleFavorite(req.user.id, productId);
        res.status(201).json(result);
})

const checkFavorite = catchAsync(
    async (req, res) => {
        const { productId } = req.params;
        const isFav = await favoriteService.checkFavorite(req.user.id, productId);
        res.status(201).json({ isFavorite: isFav });
    }
)

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    checkFavorite
}