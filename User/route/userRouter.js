const express = require('express')
const router = express.Router();
const userController = require('../../User/controller/userController')
const verifyToken = require('../../middleware/verifyToken')
const verifyRole = require('../../middleware/verifyRole')
const { redisCacheMiddleware } = require('../../middleware/redis');
const { uploads, processUpload } = require('../../middleware/multer.js')


router.route('/')
    .get(verifyToken, verifyRole("admin"), userController.getUsers)

router.route('/update')
    .patch(verifyToken, uploads.single('avatar'), processUpload, userController.updateUser)

router.route('/delete')
    .delete(verifyToken, userController.deleteUser)

router.route('/:id')
    .get(redisCacheMiddleware(3600), userController.getSingleUser)
    .patch(userController.addFollow)

module.exports = router