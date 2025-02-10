import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

//Auth Controller Functions

export const signup = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    // Validating Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(405).json({ error: "Invalid email format" });
    }
    // Finding User and Email
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username Already Taken" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "Account already exists. Try Logging IN" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password length must be atleast 6 charactes" });
    }
    //Hashing and Storing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      res.status(401).json({ error: "Invalid user Data" });
    }
  } catch (error) {
    console.log("Error in SignUP Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!username || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or Password" });
    }

    generateTokenAndSetCookie(user._id, res);
    //Sending user Credentials
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (error) {
    console.log("Error in Login Controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.error("Erorr in Logout Controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Erorr in GetMe Auth Controller", error.message);
    return res.status(500).json({ erorr: "Internal Server Error" });
  }
};
3;
