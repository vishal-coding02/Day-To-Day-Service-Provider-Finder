const express = require("express");
const providersRouter = express();
const {
  profiderProfileCreation,
  providerProfile,
} = require("../controllers/Users");
const { verifyToken } = require("../services/Auth");

providersRouter.post("/users/profileCreation", profiderProfileCreation);
providersRouter.get("/users/providerProfile/:id", verifyToken, providerProfile);

module.exports = providersRouter;
