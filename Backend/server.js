import dotenv from "dotenv";
//Current Working Directory; TWitterClone
dotenv.config({ path: "Backend/.env" }); //Relative Path to Backend/.env

import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import connectMongoDB from "./server/DB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
// Debugging
// console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
// console.log("Current Working Directory:", process.cwd());
// console.log("Loaded JWTSECRET:", process.env.JWT_SECRET);

const app = express();
const port = process.env.PORT || 3000;

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploads temporarily
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//MiddleWares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// console.log("Cloudinary Config:", cloudinary.config());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

//Serving Running Get request on Home Page
app.get("/", (req, res) => {
  res.json({ data: "Server is Running" });
});
app.listen(port, () => {
  console.log(`Listening to PORT:${port}`);
  connectMongoDB();
  console.log("Cloudinary Connected");
});
