const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  login,
  userProfile,
  addAddress,
} = require("../controllers/Users");
const { verifyToken } = require("../services/Auth");

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);
userRouter.get("/users/profile", verifyToken, userProfile);
userRouter.post("/users/address", addAddress);

module.exports = userRouter;
