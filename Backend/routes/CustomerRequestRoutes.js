const express = require("express");
const customerRouter = express.Router();
const { verifyToken } = require("../services/Auth");
const {
  createRequest,
  myRequest,
  findProviders,
} = require("../controllers/CustomerRequests");

customerRouter.post("/customers/request", verifyToken, createRequest);
customerRouter.get("/customers/myRequest", verifyToken, myRequest);
customerRouter.get("/customers/providers", verifyToken, findProviders);

module.exports = customerRouter;
