import express from 'express'
import dotenv from 'dotenv'
import db from "./config/database.js";
import {errorHandler} from "./middlewares/errors.js";
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

//routes
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

// Load Config
dotenv.config()

const app = new express()

// BodyParser & headers
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

// Static Folder
app.use(express.static("public"))

// connect database
try {
    await db.authenticate()
    console.log("database is connected")
    await db.sync()
} catch (err) {
    console.log(err)
}

// Routes
app.use("/api/users", userRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/video", videoRoutes)
app.use("/api/news", newsRoutes)
app.use("/api/comment", commentRoutes)

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})