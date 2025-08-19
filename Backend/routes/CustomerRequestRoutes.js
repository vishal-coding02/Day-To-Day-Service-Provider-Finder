const express = require("express");
const customerRouter = express.Router();
const { verifyToken } = require("../services/Auth");
const { createRequest } = require("../controllers/CustomerRequests");

customerRouter.post("/customers/request", verifyToken, createRequest);

module.exports = customerRouter