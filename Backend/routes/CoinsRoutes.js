const express = require("express");
const coinsRouter = express.Router();
const { verifyToken } = require("../services/Auth");
const { purchaseCoin, fetchCoins } = require("../controllers/Coins");

coinsRouter.post("/buyCoins", verifyToken, purchaseCoin);
coinsRouter.get("/coins", verifyToken, fetchCoins);

module.exports = coinsRouter;
