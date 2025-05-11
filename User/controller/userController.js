const catchAsync = require('../../utils/catchAsync')
const userService = require('../service/userService')


const filterbody = (obj, ...allowedFields) => {
    const newobj = {}
    Object.keys(obj).forEach(key => {
        if (allowedFields.includes(key)) {
            newobj[key] = obj[key]
        }
    })
    return newobj
}

const getUsers = catchAsync(async (req, res, next) => {

    const users = await userService.getUsers()
    return res.status(200).json({ success: true, data: users })
})

const getSingleUser = catchAsync(async (req, res, next) => {
    const users = await userService.getSingleUser(req.params.id)
    res.json({
        status: "success",
        data: users
    })
})

const updateUser = catchAsync(async (req, res, next) => {
    const updatedUser = await userService.updateUser(req.body, req.user._id, req.file)
    return res.json({
        success: true,
        data: updatedUser
    })
})

const deleteUser = catchAsync(async (req, res, next) => {
    await userService.deleteUser(req.user.id)
    return res.json({
        success: true,
        data: null
    })
})

const addFollow = catchAsync(async (req, res) => {
    const userId = req.params.id;

    const updatedUser = await userService.addFollow(userId);

    res.status(200).json({
        success: true,
        message: 'Follower count updated successfully',
        data: updatedUser
    });
})



module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    getSingleUser,
    addFollow,
}