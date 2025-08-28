const express = require("express");
const adminRouter = express.Router();
const { verifyToken } = require("../services/Auth");
const { allUsers, pendingProviders } = require("../controllers/Admin");

adminRouter.get("/users", verifyToken, allUsers);
adminRouter.get("/pendingProviders", verifyToken, pendingProviders);

module.exports = adminRouter;
