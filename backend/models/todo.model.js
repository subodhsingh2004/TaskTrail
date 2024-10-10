import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true })


export const Todo = mongoose.model("Todo", todoSchema);
