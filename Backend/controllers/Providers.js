const Providers = require("../models/ProviderModel");
const Users = require("../models/UserModel");

async function profiderProfileCreation(req, res) {
  try {
    const { id, name, idProf, servicesList, image, bio, totalJobs, avgRating } =
      req.body;
    const user = await Users.findById(id);

    if (!user) return res.status(400).json({ error: "user not found" });

    const newProfile = {
      userID: user._id,
      providerIdProf: idProf,
      providerName: name,
      providerServicesList: servicesList,
      providerImageUrl: image,
      providerBio: bio,
      providerTotalJobs: totalJobs,
      providerAvgRating: avgRating,
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

module.exports = { profiderProfileCreation, providerProfile };
