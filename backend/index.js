import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config()

// PORT
const PORT = process.env.PORT || 5000

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port : ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("mongodb connection failed !!", error);
    })