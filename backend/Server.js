const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const passport = require("passport");
const GoogleStrategy = require("./middlewares/GoogleAuth");

require("dotenv").config();

const UserRoutes = require("./routes/UserRoutes");
const PaymentRoutes = require("./routes/PaymentRoutes");
const EventRoutes = require("./routes/EventRoutes");
const SavingRoutes = require("./routes/SavingRoutes");

const PORT = process.env.PORT || 5001;
const db = process.env.MONGO_URI;

const app = express();
app.use(express.json());

app.use(cors());

const startServer = async () => {
  try {
    await mongoose.connect(db);
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB & listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();

passport.use("google", GoogleStrategy);

app.use("/api", UserRoutes);
app.use("/api", PaymentRoutes);
app.use("/api", EventRoutes);
app.use("/api", SavingRoutes);

app.get("/", (req, res) => {
  fs.readFile("./pages/Server.html", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data);
    }
  });
});
