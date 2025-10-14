const express = require("express");
const { registerUserController, loginUserController, logoutUserController, updateUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken")


router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/logout",authMiddleware, logoutUserController);

router.patch("/update", authMiddleware, updateUserController);



module.exports = router;