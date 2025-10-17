const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: 3,
      trim: true,
      // Required only if NOT an OAuth user
      required: function () {
        return !this.googleId && !this.githubId;
      },
    },
    email: {
      type: String,
      unique: true,
      // Required only if NOT an OAuth user
      required: function () {
        return !this.googleId && !this.githubId;
      },
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
      // Required only if NOT an OAuth user
      required: function () {
        return !this.googleId && !this.githubId;
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows null values
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true, // allows null values
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
