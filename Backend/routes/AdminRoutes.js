const express = require("express");
const adminRouter = express.Router();
const { verifyToken } = require("../services/Auth");
const {
  allUsers,
  pendingProviders,
  reviewProviderProfile,
} = require("../controllers/Admin");

adminRouter.get("/users", verifyToken, allUsers);
adminRouter.get("/pendingProviders", verifyToken, pendingProviders);
adminRouter.get(
  "/reviewProviderProfile/:id",
  verifyToken,
  reviewProviderProfile
);

module.exports = adminRouter;