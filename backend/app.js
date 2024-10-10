import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"


const app = express();

// configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// importing routes
import userRouter from "./routes/user.routes.js"
import todoRouter from "./routes/todo.routes.js"

// Declaring User Routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/todo', todoRouter)

app.use((err, req, res, next) => {
    // .error(err.stack); 
    res.status(err.statusCode || 500).json({ error: err.message })
});

// -----------------------------deployment------------------------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  })
} else {
  app.get('/', (req, res) => {
    res.send("API is running :)")
  })
}

// -----------------------------deployment------------------------------------

export { app }