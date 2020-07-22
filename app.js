const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const authRoute = require('./routes/auth');
const restaurantsRouter = require('./routes/restaurants');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware - auth
app.use(cors());
app.use(express.json());

// // ROUTES
app.use('/restaurants', restaurantsRouter);
app.user('/restaurant', authRoute);

const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
