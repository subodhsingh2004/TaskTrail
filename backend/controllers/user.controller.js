import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendOTPEmail } from "../services/emailService.js";
import { generateOTP, verifyOTP } from "../services/OTPService.js";


let user;
let passwordResetUser = {};

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the token")
    }
}

const registerUser = asyncHandler(async function (req, res) {
    const { username, email, password } = req.body

    if (password.trim().length < 8) {
        throw new ApiError(403, "Password length must be 8")
    }


    // find if user already exist
    const existedUser = await User.findOne({ email })
    if (existedUser) {
        throw new ApiError(401, "User already exists")
    }

    // generate OTP
    const OTP = generateOTP(email)

    // send this otp to user
    await sendOTPEmail(email, OTP)

    user = new User({
        username,
        email,
        password
    })

    res.status(200).json({ message: "OTP has been sent to your email" })
})

const signupOTPVerify = asyncHandler(async function (req, res) {

    await user.save()

    // generate token
    const token = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("token", token.accessToken, options)
        .json(new ApiResponse(200, loggedInUser, "Logged in successfully"))

})

const loginUser = asyncHandler(async function (req, res) {
    const { email, password } = req.body

    // find user
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(403, "Incorrect email or password")
    }

    // check password
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect email or password")
    }

    // generate token
    const token = await generateAccessAndRefreshToken(user._id)

    // response
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("token", token.accessToken, options)
        .json(new ApiResponse(200, loggedInUser, "Logged in successfully"))
})

const logoutUser = asyncHandler(async function (req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: "Logout Successfully" })
})

const resetPassword = asyncHandler(async function (req, res) {
    const { email } = req.body

    passwordResetUser = email

    // find user
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, "Invalid Email")
    }

    const OTP = generateOTP(email)

    await sendOTPEmail(email, OTP)

    res.status(200).json({ message: "OTP has been sent to your email" })
})

const resetPasswordOTPVerify = asyncHandler(async function (req, res) {
    const { otp } = req.body
    const email = passwordResetUser    

    if (!otp) throw new ApiError(404, "OTP not found")

    const isOTPValid = verifyOTP(otp, email)

    if (!isOTPValid) throw new ApiError(403, "OTP is not Valid")

    res.status(200).json({ message: "Done" })
})

const resetPasswordNew = asyncHandler(async function (req, res) {
    const { newPassword } = req.body
    const email  = passwordResetUser    

    // find user
    const user_reset = await User.findOne({ email })
    
    user_reset.password = newPassword
    await user_reset.save()

    passwordResetUser = {}

    res.status(200).json({ message: "Password has been reset" })
})

const deleteAccount = asyncHandler(async function (req, res) {
    const userId = req.user
    if (!userId) {
        throw new ApiError(403, "Unauthorized Request")
    }

    const deletedUser = await User.findByIdAndDelete(userId)

    res.status(201).json({ message: "Account deleted successfully" })
})


export { registerUser, signupOTPVerify, resetPassword, resetPasswordOTPVerify, loginUser, logoutUser, resetPasswordNew }