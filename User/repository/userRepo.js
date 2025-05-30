const User = require('../model/userModel')

const Findusers = async () => {
    return await User.find()
}

const findUserById = async (id) => {
    return await User.findById(id);
}

const findUserByIdAndUpdate = async (userId, fields) => {
    return await User.findByIdAndUpdate(userId, fields, {
        new: true,
        runValidators: true
    })
}

const deleteuser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { active: false })
}


module.exports = {
    Findusers,
    findUserByIdAndUpdate,
    deleteuser,
    findUserById,
}