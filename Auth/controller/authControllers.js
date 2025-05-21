const authService = require('../service/authService.js')
const catchAsync = require('../../utils/catchAsync')
const sendEmail = require('../../utils/email.js')
const userRepository = require('../repository/authRepo.js')
const bcrypt = require("bcryptjs");

const Register = catchAsync(async(req , res , next)=>{
    const {user,token} = await authService.Register(req.file , req.body,res)
    
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
    const {user} = await authService.login(req.body.email , req.body.password , res)
    return res.status(200).json({success : true , msg : "login succssefully",user})
})

const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await authService.findUserByEmail(email);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const otp = authService.generateOTP();
      const otpExpires = Date.now() + 10 * 60 * 1000; // 10 دقائق
  
      await authService.saveOTP(user._id, otp, otpExpires);
      await sendEmail(user.email, `Your OTP code is: ${otp}`);
  
      res.status(200).json({ message: "OTP sent to email" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
const verifyOTP = async (req, res) => {
    try {
      const { email, otp } = req.body;
      const user = await authService.findUserByEmail(email);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const now = Date.now();
      if (user.otp !== otp || user.otpExpires < now) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
  
      res.status(200).json({ message: "OTP verified" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

const resetPassword = async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      const user = await authService.findUserByEmail(email);
      if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userRepository.updateById(user._id, {
        password: hashedPassword,
        otp: null,
        otpExpires: null,
      });
  
      res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

module.exports = {
    login,
    Register,
    forgotPassword,
    verifyOTP,
    resetPassword
}