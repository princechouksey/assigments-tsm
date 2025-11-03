const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const path = require("path");
const imagekit = require("../config/imagekit");
const redis = require("../config/redisClient")


module.exports.registerUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Upload image to ImageKit
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}_${username || "user"}.png`,
    });

    const signedUrl = imagekit.url({
      src: result.url,
      signed: true,
      expireSeconds: 300, // URL valid for 5 minutes
    });
    console.log(signedUrl);
    //  Apply transformations (resize, optimize, face focus)
    const optimizedUrl = imagekit.url({
      src: signedUrl,
      transformation: [
        {
          width: 300,
          height: 300,
          quality: "auto",
          format: "auto",
          focus: "face",
        },
      ],
    }); // apply automatic optimization

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profileImage: optimizedUrl, // ✅ transformed image
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    redis.set(`auth:${newUser._id}`, token , "EX", 3600);

    // Set cookie and respond
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      message: "User Registered & Image Optimized Successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profileImage: optimizedUrl,
      },
      token,
    });
  } catch (error) {
    console.error("Error in registerUserController:", error);
    next(error);
  }
};

module.exports.loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found. Please register first." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logoutUserController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    res.cookie("token", "");
    await redis.del(`auth:${userId}`); // delete token from Redis


    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserController = async (req, res, next) => {
  try {
    const user = req.user;
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Field are required" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        username,
        email,
        password: hashedPassword,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "User updated Successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getCurrentUserController = async (req, res, next) => {
  const user = req.user;
  console.log(user);
  res.status(201).json({
    data: user,
    success: true,
  });
};

