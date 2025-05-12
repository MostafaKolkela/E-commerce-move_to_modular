const userRepo = require('../repository/userRepo')


const filterbody = (obj, ...allowedFields) => {
    const newobj = {}
    Object.keys(obj).forEach(key => {
        if (allowedFields.includes(key)) {
            newobj[key] = obj[key]
        }
    })
    return newobj
}

const getUsers = async () => {
    return await userRepo.Findusers()
}

const getSingleUser = async (id) => {
    const user = await userRepo.findUserById(id)
    if (!user) {
        throw new AppError('there is no user found with this ID', 404)
    }
    return user
}


const updateUser = async (Data, userId, file) => {
    if (file) {
        Data.avatar = file.filename;
    }
    const fields = filterbody(Data, 'firstName', 'lastName', 'email', 'phone', 'city', 'street', 'flat', 'country', 'description', 'avatar','date')
    console.log(fields)
    return await userRepo.findUserByIdAndUpdate(userId, fields)
}

const deleteUser = async (userId) => {
    return await userRepo.deleteuser(userId)
}

const addFollow = async (userId) => {
    const user = await userRepo.findUserById(userId);


    user.followers += 1;
    await user.save();

    return user;
};




module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    getSingleUser,
    addFollow,
}




