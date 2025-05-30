const User = require('../../User/model/userModel')


const FindByEmail = async(email)=>{
    const user = await User.findOne({email:email})
    return user
}

const saveuser = async(userData)=>{
    const user = new User(userData)
    return await user.save()
}

const updateById = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

module.exports = {
    FindByEmail,
    saveuser,
    updateById
}