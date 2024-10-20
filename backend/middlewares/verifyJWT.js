import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler(async function (req, res, next) {
    try {
        const token = req.cookies?.token || req.header("authorization")?.replace("Bearer", "")
        
        if (!token) throw new ApiError(401, "unauthorized request")
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if(!user) throw new ApiError(401, "invalid access token")

        req.user = user
        next()
        
    } catch (error) {
        throw new ApiError(401, error.message || "invalid access token")
    }
})