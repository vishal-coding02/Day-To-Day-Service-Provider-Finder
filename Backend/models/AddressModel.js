const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  stateName: { type: String, required: true },
  stateId: { type: Number, required: true },
});

const Address = mongoose.model("allowedAddress", addressSchema);

module.exports = Address;
