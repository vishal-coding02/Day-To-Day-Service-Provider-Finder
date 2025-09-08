const express = require("express");
const providersRouter = express();
const {
  profiderProfileCreation,
  providerProfile,
  providerDashBoard,
  providerUnderReview,
} = require("../controllers/Providers");
const { verifyToken } = require("../services/Auth");

providersRouter.post("/profileCreation", profiderProfileCreation);
providersRouter.get("/profile/:id", verifyToken, providerProfile);
providersRouter.get("/providerDashBoard", verifyToken, providerDashBoard);
providersRouter.get("/providerUnderReview/:id", verifyToken, providerUnderReview);

module.exports = providersRouter;
