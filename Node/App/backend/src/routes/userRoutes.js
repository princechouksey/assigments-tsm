const express = require("express");
const { registerUserController, loginUserController, logoutUserController, updateUserController, getCurrentUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/logout",authMiddleware, logoutUserController);
router.get("/me", authMiddleware, getCurrentUserController);
router.patch("/update", authMiddleware, updateUserController);
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user.id; 
    const users = await User.find({ _id: { $ne: currentUserId } }).select("username _id");
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;