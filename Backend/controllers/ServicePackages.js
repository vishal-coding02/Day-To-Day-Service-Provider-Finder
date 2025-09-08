const Users = require("../models/UserModel");
const Package = require("../models/ServicePackagesModel");

async function createPackages(req, res) {
  try {
    if (req.user.type !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Only provider can add packages",
      });
    }
    const {
      id,
      title,
      description,
      price,
      duration,
      servicesIncluded,
      deliveryTime,
      isActive,
    } = req.body;
    console.log(req.body);
    const user = await Users.findById(id);

    if (!user) return res.status(400).json({ error: "user not found" });

    const newPackage = {
      userID: id,
      providerName: user.userName,
      packageTitle: title,
      packageDescription: description,
      packagePrice: price,
      packageTime: duration,
      packageServicesList: servicesIncluded,
      packagesDeliveryTime: deliveryTime,
      packageStatus: isActive,
    };
    await Package.create(newPackage);
    console.log("package created");
    res
      .status(201)
      .json({ message: "provider packages created successfully." });
  } catch (err) {
    console.log("Provider Packages Error :", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { createPackages };
