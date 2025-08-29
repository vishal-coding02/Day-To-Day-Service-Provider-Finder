const Users = require("../models/UserModel");
const Providers = require("../models/ProviderModel");

async function pendingProvider(req, res) {
  try {
    if (req.user.type === "provider") {
      const user = await Users.findById(req.params.id);
      const provider = await Providers.findOne({ userID: req.params.id });

      if (!user || !provider) {
        return res.status(404).json({ error: "User/Provider not found" });
      }

      if (provider.status === "pending") {
        return res.status(200).json({
          status: "pending",
          message:
            "Tumhara account abhi review ke liye gaya hai. Jab approve ho jayega tab tum login kar sakte ho.",
        });
      }

      return res.status(200).json({
        status: provider.status,
        message:
          "Your account has been submitted for review. Our team is currently verifying your details and documents to ensure everything meets our guidelines. During this review period, you won’t be able to access the provider dashboard or offer services. Once your account is approved, you will receive a confirmation email and then you can log in normally. Thank you for your patience and cooperation.",
      });
    } else {
      return res.status(403).json({ message: "Access denied. Provider only." });
    }
  } catch (err) {
    console.error("Error checking provider status:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = pendingProvider;
