const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const amadeusRoutes = require("./routes/amadeusRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.use("/api/amadeus", amadeusRoutes);

app.get("/", (req, res) => {
  res.send("Tamarind Tracker API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
