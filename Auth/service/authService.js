const Repo = require('../repository/authRepo')
const bcrypt = require('bcrypt')
const AppError = require('../../utils/AppError')
const catchAsync = require('../../utils/catchAsync')
const generateToken = require('../../utils/GenerateToken')
const sendMail = require('../../utils/mailer')
const multer = require('../../middleware/multer')

const Register = async(avatarfile , userData,res)=>{
    const {firstName , email ,lastName , password,phone,city,flat,street,country,description,role,date} = userData
    const olduser = await Repo.FindByEmail(email)
    if(olduser)
        {
            throw new AppError('account is already exists!' , 400)
        }

    const hash_pass = await bcrypt.hash(password , 12)
    const newUser = {
        firstName,
        lastName,
        email,
        password : hash_pass,
        avatar : avatarfile ? avatarfile.filename : "profile.jpg",
        phone,
        city,
        flat,
        street,
        country,
        description,
        role,
        date
    }

    const user = await Repo.saveuser(newUser);

    const token = generateToken({email : user.email , id : user._id},res)
    res.cookie('JWT',token,
        {
            maxAge : 86400,
            // secure : ture /// production only
            httpOnly : true
        })
    user.token = token;
    await user.save();

    // await sendMail({
    //     mail : newuser.email,
    //     subject : 'Welcome',
    //     message : 'welcome from our website!'
    // })
    return {user}
}

const login = async(email,password,res)=>{
    const user = await Repo.FindByEmail(email)
    if(!user)
        {
            throw new AppError("user not found!" , 404)
        }
    const pass = await bcrypt.compare(password , user.password)
    if(pass)
        {
            const token = generateToken({email : user.email , id : user._id},res)

            res.cookie('JWT',token,
                {
                    maxAge : 86400,
                    // secure : ture /// production only
                    httpOnly : true
                })

            user.token = token
            await Repo.saveuser(user);
            const id = user._id
            return {token,id}
        }
    throw new AppError("password or Email are incorrect!" , 500)
}



const forgetpassword = async(email)=>{
    const user = await Repo.FindByEmail(email)
    if(!user){
        throw new AppError("user are not exist!" , 404)
    }
    user.generateResetPassToken()
}


module.exports = {
    login,
    Register,
    forgetpassword,
}