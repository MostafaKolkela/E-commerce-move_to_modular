const authServices = require('../service/authService')
const catchAsync = require('../../utils/catchAsync')


const Register = catchAsync(async(req , res , next)=>{
    const {user,token} = await authServices.Register(req.file , req.body,res)
    
    res.cookie("JWT", token, {
        maxAge: 86400 * 1000,
        httpOnly: true,
    });

    return res.status(201).json({
        msg : "done",
        user,
        token
    })
})

const login = catchAsync(async( req, res,next)=>{
    const {user} = await authServices.login(req.body.email , req.body.password , res)
    return res.status(200).json({success : true , msg : "login succssefully",user})
})


const forgetpassword = catchAsync(async(req,res,next)=>{
    const resettoken = await authServices.forgetpassword(req.body.email)
})


module.exports = {
    login,
    Register,
    forgetpassword,
}