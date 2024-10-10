import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return emailRegex.test(v)
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return v.length >= 8
            },
            message: "Password length must be 8"
        }
    },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo"
        }
    ],
    refreshToken: {
        type: String
    }
}, { timestamps: true })


// hashing password before saving 
userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

// password to check password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// refresh token generator
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,     
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// access token generator
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)