const mongoose = require("mongoose");

const optSchema = new mongoose.Schema({
  opt: { type: Number, required: true },
});

const Otp = mongoose.model("otpverification", optSchema);

module.exports = Otp;
