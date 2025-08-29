const Users = require("../models/UserModel");
const Providers = require("../models/ProviderModel");

async function allUsers(req, res) {
  try {
    if (req.user.type === "admin") {
      const users = await Users.find({});
      console.log(users);
      if (users.length > 0) {
        res.status(200).json({ allUsers: users });
      } else {
        res.status(404).json({ error: "users not found" });
      }
    } else {
      res.status(403).json({ message: "Access denied. Admin only." });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function pendingProviders(req, res) {
  try {
    if (req.user.type === "admin") {
      const providers = await Providers.find({ status: "pending" });

      if (providers.length > 0) {
        res.status(200).json({ allProviders: providers });
      } else {
        res.status(404).json({ error: "Providers not found" });
      }
    } else {
      res.status(403).json({ message: "Access denied. Admin only." });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function reviewProviderProfile(req, res) {
  try {
    if (req.user.type === "admin") {
      const userId = req.params.id;

      const user = await Users.findById(userId);
      const provider = await Providers.findOne({ userID: userId });

      if (!user && !provider) {
        return res.status(404).json({ error: "User/Provider not found" });
      }

      res.status(200).json({
        userData: user || null,
        providerData: provider || null,
      });
    } else {
      res.status(403).json({ message: "Access denied. Admin only." });
    }
  } catch (err) {
    console.log("Error :", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { allUsers, pendingProviders, reviewProviderProfile };
