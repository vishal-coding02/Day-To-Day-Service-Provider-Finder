const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/UsersRoutes");
const refresTokenRouter = require("./routes/RefreshTokenRoute");
const providersRouter = require("./routes/ProviderRoutes");

app.use(express.json());
app.use(cookieParser());
// Server Port
const PORT = process.env.PORT;

// Server connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// All Routes
app.use(userRouter);
app.use(refresTokenRouter);
app.use(providersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
