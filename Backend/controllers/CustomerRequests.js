const Users = require("../models/UserModel");
const CustomerRequests = require("../models/CustomerModel");

async function createRequest(req, res) {
  try {
    if (req.user.type === "customer") {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(404).json({ error: "user not found" });

      const newRequest = {
        userID: user._id,
        customerName: user.userName || req.body.name,
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
    } else {
      return res
        .status(403)
        .json({ error: "Only customers can create a request" });
    }
  } catch (err) {
    console.error("Customer Request Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function myRequest(req, res) {
  try {
    if (req.user.type === "customer") {
      const requests = await CustomerRequests.find({
        userID: req.user.id,
      }).populate("userID", "userEmail");
      console.log(requests);

      if (!requests || requests.length === 0) {
        return res
          .status(404)
          .json({ message: "No requests found for this customer" });
      }

      res.status(200).json({
        message: "My Requests fetched successfully",
        data: requests,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Only customers can see their requests",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
module.exports = { createRequest, myRequest };
