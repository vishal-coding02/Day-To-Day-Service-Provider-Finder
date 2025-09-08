const express = require("express");
const packageRouter = express.Router();
const { verifyToken } = require("../services/Auth");
const { createPackages } = require("../controllers/ServicePackages");

packageRouter.post("/addPackages", verifyToken, createPackages);

module.exports = packageRouter;
