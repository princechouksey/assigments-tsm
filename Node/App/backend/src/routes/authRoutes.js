const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const { getCurrentUserController } = require("../controllers/userController");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, displayName: req.user.displayName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token);
    res.status(201).json("Logged in Successfully");
  }
);

// Step 4a: Redirect user to GitHub login
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// Step 4b: GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token to frontend
    res.json({ token, user: req.user });
  }
);

module.exports = router;
