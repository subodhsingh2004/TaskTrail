import { Router } from "express";
import { signupOTPVerify, registerUser, resetPassword, resetPasswordOTPVerify, loginUser, logoutUser, resetPasswordNew } from "../controllers/user.controller.js";
import OTPVerification from "../middlewares/OTPVerification.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router()

// register
router.route('/signup').post(registerUser)
router.route('/signup/verify-otp').post(OTPVerification, signupOTPVerify)

// reset password
router.route('/reset-password').post(resetPassword)
router.route('/reset-password/verify-otp').post(resetPasswordOTPVerify)
router.route('/reset-password/new-password').post(resetPasswordNew)

// login
router.route('/login').post(loginUser)

// logout
router.route('/logout').post(verifyJWT, logoutUser)



export default router