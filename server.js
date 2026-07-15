require("dotenv").config();
require("./database/database");
const downloadRoute = require("./routes/download");
const qrRoute=require("./routes/qr");
const adminRoutes=require("./admin/routes/admin");
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT || 8000;

// Security
app.use(helmet());

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookies
app.use(cookieParser());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change-this-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000
    }
  })
);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home Route
app.get("/", (req, res) => {
  res.render("pages/index", {
    title: "All Downloader Pro"
  });
});

// Health Check (Required for Koyeb)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime()
  });
});
app.use("/download",downloadRoute);
app.use("/admin",adminRoutes);
app.use("/qr",qrRoute);

// 404 Page
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
