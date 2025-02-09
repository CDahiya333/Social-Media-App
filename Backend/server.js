import dotenv from "dotenv";
//Current Working Directory; TWitterClone
dotenv.config({path:"Backend/.env"}); //Relative Path to Backend/.env

console.log("Current Working Directory:", process.cwd());

import express from "express";
import authRoutes from "./routes/authRoutes.js";
import connectMongoDB from "./server/DB.js";

// Debugging
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ data: "Server is Running" });
});
app.listen(port, () => {
  console.log(`Listening to PORT:${port}`);
  connectMongoDB();
});
