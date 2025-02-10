import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import path from "path";
dotenv.config()

connectDb()
// connectCloudinary()
const app = express()
// to make input as json
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:process.env.CORS_ORIGIN,credentials:true}))

app.listen(3000, () =>{
    console.log("Server is running on port 3000")
})

import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"
import connectDb from "./config/mongodb.js"
import uploadRouter from "./routes/upload.js"
import connectCloudinary from "./config/cloudinary.js"

app.use("/api/auth",authRouter)
app.use("/api/note",noteRouter)
app.use("/api",uploadRouter)

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.get("/",(req,res)=>{
    res.send("api working fine")
})

//Error part should be at last
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})