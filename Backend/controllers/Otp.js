// Verify OTP
const Otp = require("../models/OtpModel");
const Users = require("../models/UserModel");

async function verifyOtp(req, res) {
  try {
    const { phone, otp } = req.body;
    const userNumber = await Users.findOne({ userPhone: phone });
    const userOtp = await Otp.findOne({ otp: otp });

    if (userNumber && userOtp) {
      return res.json({ success: true, message: "OTP verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    console.log("Error :", err.message);
  }
}

module.exports = { verifyOtp };
