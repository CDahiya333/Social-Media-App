import dotenv from "dotenv";
//Current Working Directory; TWitterClone
dotenv.config({path:"Backend/.env"}); //Relative Path to Backend/.env


import express from "express";
import authRoutes from "./routes/authRoutes.js";
import connectMongoDB from "./server/DB.js";
import cookieParser from "cookie-parser";

// Debugging
// console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
// console.log("Current Working Directory:", process.cwd());
// console.log("Loaded JWTSECRET:", process.env.JWT_SECRET);

const app = express();
const port = process.env.PORT || 3000;
//MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);


//Serving Running Get request on Home Page
app.get("/", (req, res) => {
  res.json({ data: "Server is Running" });
});
app.listen(port, () => {
  console.log(`Listening to PORT:${port}`);
  connectMongoDB();
});
