const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const menusRouter = require('./routes/menus');
const usersRouter = require('./routes/users');
const restaurantsRouter = require('./routes/restaurants');

require('dotenv').config();

// const url = 'mongodb://localhost:27017';
// const dbName = 'test2';

const app = express();
const port = process.env.PORT || 4000;

// Middleware - auth
app.use(cors());
app.use(express.json());

// // ROUTES
app.use('/users', usersRouter);
app.use('/menus', menusRouter);

const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
