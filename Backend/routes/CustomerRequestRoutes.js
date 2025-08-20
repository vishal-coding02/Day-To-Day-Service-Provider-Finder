const express = require("express");
const customerRouter = express.Router();
const { verifyToken } = require("../services/Auth");
const { createRequest, myRequest } = require("../controllers/CustomerRequests");

customerRouter.post("/customers/request", verifyToken, createRequest);
customerRouter.get("/customers/myRequest", verifyToken, myRequest);

module.exports = customerRouter;
