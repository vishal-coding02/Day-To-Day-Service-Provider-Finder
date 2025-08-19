const Users = require("../models/UserModel");
const CustomerRequests = require("../models/CustomerModel");

async function createRequest(req, res) {
  if (req.user.type === "customer") {
    try {
      const user = await Users.findById(req.body.id);
      if (!user) return res.status(404).json({ error: "user not found" });

      const newRequest = {
        userID: user._id,
        customerName: user.userName,
        customerPrice: req.body.price,
        customerMedia: req.body.media,
        customerServicesList: req.body.serviceType,
        customerLocation: req.body.location,
        customerDescription: req.body.description,
        createdAt: new Date(),
      };

      await CustomerRequests.create(newRequest);
      console.log("Request created");
      res
        .status(201)
        .json({ message: "Request created successfully", data: newRequest });
    } catch (err) {
      console.error("Customer Request Error:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
  }
}

module.exports = { createRequest };
