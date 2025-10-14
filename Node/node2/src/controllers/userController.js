const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");


module.exports.registerUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRE, {
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
    res.cookie("token", "");

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


