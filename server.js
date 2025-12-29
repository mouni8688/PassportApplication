const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const db = require("./db");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const statusRoutes = require("./routes/statusRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend
app.use(express.static("public"));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/status", statusRoutes);

// root test
app.get("/", (req, res) => {
  res.send("🚀 Passport Application Backend is LIVE");
});

// 🔥 THIS LINE IS CRITICAL
const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
