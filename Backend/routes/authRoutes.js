import express from "express";
import { signup, login, logout } from "../controllers/authController.js"
const router = express.Router();

// SignUP
router.get("/signup", signup);

// Login
router.get("/login", login);

//LogOUT
router.get("/logout",logout);
export default router;
