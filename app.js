const express = require("express");
require('dotenv').config()
require('express-async-errors');
const path = require("path");
const morgan = require("morgan");
const itineraryRoutes = require("./routes/itineraryRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
const mongoose = require("mongoose");
const publicDir = "/public/";

// connect to mongodb
const dbURI = process.env.DB_KEY;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).catch((err) => console.log(err));

// express app
const app = express();

//Cors Configuration
app.use(cors());

// middleware & static files
app.use(express.static(path.join(__dirname, publicDir)));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
// routes
app.use("/data/itinerary", requireAuth, itineraryRoutes);
//auth routes
app.use(authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).send("404: Page Not Found");
});
app.use(errorMiddleware);
module.exports = app