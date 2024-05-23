const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const UserRoutes = require("./routes/UserRoutes");
const PaymentRoutes = require("./routes/PaymentRoutes");
const EventRoutes = require("./routes/EventRoutes");

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

// app.use("/api", UserRoutes);
app.use("/api", PaymentRoutes);
app.use("/api", EventRoutes);

app.get("/", (req, res) => {
  // Leggi il file HTML e invialo come risposta
  fs.readFile("./pages/Server.html", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data); // Invia il contenuto del file HTML come risposta
    }
  });
});
