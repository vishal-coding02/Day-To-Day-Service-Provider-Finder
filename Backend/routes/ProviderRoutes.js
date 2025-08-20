const express = require("express");
const providersRouter = express();
const {
  profiderProfileCreation,
  providerProfile,
} = require("../controllers/Providers");
const { verifyToken } = require("../services/Auth");

providersRouter.post("/providers/profileCreation", profiderProfileCreation);
providersRouter.get(
  "/providers/providerProfile/:id",
  verifyToken,
  providerProfile
);

module.exports = providersRouter;
