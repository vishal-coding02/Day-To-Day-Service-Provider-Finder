const Users = require("../models/UserModel");
const Address = require("../models/AddressModel");
const Providers = require("../models/ProviderModel");
const { bcryptjs, generateToken } = require("../services/Auth");

async function signUp(req, res) {
  try {
    const hashPass = await bcryptjs.hash(req.body.password, 10);
    const newUser = {
      userName: req.body.name,
      userEmail: req.body.email,
      userPhone: req.body.phone,
      userPassword: hashPass,
      userAddress: req.body.address,
      userType: req.body.type,
      createdAt: new Date(),
    };
    await Users.create(newUser);
    res.status(201).json({ message: "User created successfully!" });
    console.log("user craeted...", newUser);
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  const user = await Users.findOne({ userEmail: req.body.email });
  if (!user) {
    console.log("User not found");
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcryptjs.compare(req.body.password, user.userPassword);
  if (!isMatch) {
    console.log("Invalid credentials");
    return res.status(400).send("Invalid credentials");
  }

  const { accessToken, refreshToken } = generateToken(user);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    path: "/refreshToken",
  });
  res.json({ token: accessToken });
}

async function userProfile(req, res) {
  try {
    if (req.user.type === "customer" || "provider") {
      res.status(200).json({
        message: `You are authorized. Welcome : ${req.user.name}`,
      });
    } else {
      res.status(403).json({ message: "Access denied. Users only." });
    }
  } catch (err) {
    console.log("Profile Error :", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addAddress(req, res) {
  try {
    const { address, id } = req.body;
    const stateAddress = await Address.find({ stateName: address.address });

    if (!stateAddress) {
      return res.status(400).json({
        message: "Signup is restricted. Your state is not in the allowed list.",
      });
    }

    const user = await Users.findByIdAndUpdate(id, { userAddress: address });

    if (user) {
      return res
        .status(200)
        .json({ message: "User found. Address has been added successfully." });
    } else {
      return res
        .status(404)
        .json({ message: "User not found. Address could not be added." });
    }
  } catch (err) {
    console.log("Address Error :", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function profiderProfileCreation(req, res) {
  try {
    const user = await Users.findById(req.body.id);

    if (!user) return res.status(400).json({ error: "user not found" });

    const newProfile = {
      userID: user._id,
      providerIdProf: req.body.idProf,
      providerName: req.body.name,
      providerServicesList: req.body.servicesList,
      providerImageUrl: req.body.image,
      providerBio: req.body.bio,
      providerTotalJobs: req.body.totalJobs,
      providerAvgRating: req.body.avgRating,
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
        _id: req.params.id,
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

module.exports = {
  signUp,
  login,
  userProfile,
  addAddress,
  profiderProfileCreation,
  providerProfile,
};
