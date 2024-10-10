import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb connected`);
    } catch (error) {
        console.log("Error in connecting to Database");
    }
} 

export default connectDB