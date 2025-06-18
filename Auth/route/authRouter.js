const express = require('express')
const router = express.Router();
const authController = require('../../Auth/controller/authControllers')
const { uploads, processUpload } = require('../../middleware/multer')
const validateUser = require('../../middleware/validateUser')
const passport = require('passport');

router.route('/Register')
            .post(uploads.single('avatar'), processUpload, validateUser, authController.Register)

// router.route('/forgetpassword')
//             .post(authController.forgetpassword)

router.route('/login')
            .post(authController.login)

router.route('/forgot-password')
.post(authController.forgotPassword);

router.route('/verify-otp')
.post(authController.verifyOTP);

router.route('/reset-password')
.post(authController.resetPassword);


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user;
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: req.user._id }, process.env.JWTSECRETKEY, {
      expiresIn: '1d'
    });
    // ترجع التوكن في JSON بدل ما تعمل redirect
    const userData = encodeURIComponent(JSON.stringify({
      firstName: user.firstName || '', 
      lastName: user.lastName || '',
      email: user.email || '', 
      avatar: user.avatar || ''
    }));

    res.json({
      firstName: user.firstName || '', 
      lastName: user.lastName || '',
      email: user.email || '', 
      avatar: user.avatar || ''
    })
    //.redirect(`http://localhost:5173?token=${token}&user=${userData}`);
  }
);



module.exports = router