const Providers = require("../models/ProviderModel");
const Users = require("../models/UserModel");
const CustomerRequest = require("../models/CustomerModel");

async function profiderProfileCreation(req, res) {
  try {
    const { id, name, idProf, servicesList, image, bio, totalJobs, avgRating } =
      req.body;
    const user = await Users.findById(id);

    if (!user) return res.status(400).json({ error: "user not found" });

    const newProfile = {
      userID: user._id,
      providerIdProf: idProf,
      providerName: name || user.userName,
      providerServicesList: servicesList.toLowerCase(),
      providerImageUrl: image,
      providerBio: bio,
      providerTotalJobs: totalJobs,
      providerAvgRating: avgRating,
      status: "pending",
      createdAt: new Date(),
    };
    await Providers.create(newProfile);
    console.log("provider profile created");
    res.status(201).json({ message: "provider profile created successfully." });
  } catch (err) {
    console.log("Provider Profile Error :", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function providerProfile(req, res) {
  if (req.user.type === "provider") {
    try {
      const provider = await Providers.findById({
        userID: req.user.id,
      }).populate("userID", "userName userAddress userPhone");

      if (!provider) {
        return res.status(404).json({ error: "Provider not found" });
      } else {
        res.status(200).json({ providerData: provider });
      }
    } catch (err) {
      console.log("Provider Profile Error :", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res
      .status(403)
      .json({ error: "Access denied. Only providers can view this profile." });
  }
}

async function providerDashBoard(req, res) {
  try {
    if (req.user.type === "provider") {
      const customersRequests = await CustomerRequest.find({});

      if (customersRequests.length > 0) {
        res.status(200).json({ requests: customersRequests });
      } else {
        res.status(404).json({ error: "Customers Requests not found" });
      }
    } else {
      res.status(403).json({ message: "Access denied. Provider only." });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function providerUnderReview(req, res) {
  try {
    if (req.user.type === "provider") {
      const user = await Users.findById(req.params.id);
      const provider = await Providers.findOne({ userID: req.params.id });

      if (!user || !provider) {
        return res.status(404).json({ error: "User/Provider not found" });
      }

      if (provider.status === "pending") {
        return res.status(200).json({
          userName: provider.providerName,
          message:
            "Your account has been submitted for review. Our team is currently verifying your details and documents to ensure everything meets our guidelines. During this review period, you won’t be able to access the provider dashboard or offer services. Once your account is approved, you will receive a confirmation email and then you can log in normally. Thank you for your patience and cooperation.",
        });
      }
    } else {
      return res.status(403).json({ message: "Access denied. Provider only." });
    }
  } catch (err) {
    console.error("Error checking provider status:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  profiderProfileCreation,
  providerProfile,
  providerDashBoard,
  providerUnderReview,
};
