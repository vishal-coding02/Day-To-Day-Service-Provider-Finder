const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User name is required"],
    minlength: [3, "User name must be at least 3 characters long"],
    trim: true,
  },
  userEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  userPhone: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  userPassword: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
    // maxlength: [16, "Password cannot exceed 16 characters"],
    required: [true, "Password is required"],
  },
  userAddress: {
    type: {
      addressType: {
        type: String,
        required: [true, "Address type is required"],
      },
      street: { type: String, required: [true, "Address is required"] },
      country: { type: String, required: true },
      zipCode: { type: Number, required: true },
      city: { type: String, required: true },
      cityId: { type: Number, required: true },
      stateId: { type: Number, required: true },
      state: { type: String, required: true },
    },
    required: false,
  },
  userType: {
    type: String,
    required: [true, "User type is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;
