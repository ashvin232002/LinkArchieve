const express  =  require("express");
const router  =  express.Router();


const{
    sendotp,
    login,
    signup
} =  require("../controllers/Auth");

const  {
    resetPasswordToken,
    resetPassword
} =  require("../controllers/ResetPassword")


// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/LinkStore/login", login)

// Route for user signup
router.post("/LinkStore/signup", signup)

// Route for sending OTP to the user's email
router.post("/LinkStore/sendotp", sendotp)



// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/LinkStore/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/LinkStore/reset-password", resetPassword)

module.exports =  router;
