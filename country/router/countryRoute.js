const express = require('express');
const CountryController = require('../controller/countryController.js')
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken.js')
const verifyRole = require('../../middleware/verifyRole.js')
router.route('/')
    .post(verifyToken,verifyRole("admin"),CountryController.createCountry)
    .get(CountryController.getCountry)
    
router.route('/:id')
    .delete(verifyToken,verifyRole("admin"),CountryController.deleteCountry)

module.exports = router;
