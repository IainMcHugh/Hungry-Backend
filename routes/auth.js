const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Menu = require("../models/menu.model");
const Restaurant = require("../models/restaurant.model");
const {
  registerValidation,
  loginValidation,
} = require("../models/validation.model");
const { func } = require("@hapi/joi");
const e = require("express");

router.post("/register", async (req, res) => {
  // Validate first
  const { error } = registerValidation(req.body);

  if (error) {
    console.log("Something went wrong");
    return res.status(400).send(error.details[0].message);
  }

  // Checking if user is already in the database
  const user = await Restaurant.findOne({ email: req.body.email });
  if (user) {
    console.log("Email exists");
    return res.status(400).send("Email already exists");
  }

  // creating default menu for new user
  const newMenu = new Menu({
    restaurant: req.body.restaurant,
    starters: [
      {
        name: "Soup",
        description: "Hot tomato soup",
        cost: "6.80",
        allergens: [],
        kcal: "302",
      },
    ],
  });

  try {
    const savedMenu = await newMenu.save();
    const menuId = await savedMenu._id;
    console.log(`Saved Menu ID: ${menuId}`);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.password, salt);

    const restaurant = req.body.restaurant;
    const owner = req.body.owner;
    const email = req.body.email;
    const license = req.body.license;
    const password = hashPwd;
    const newRestaurant = await newUser(
      restaurant,
      owner,
      email,
      license,
      password,
      menuId
    );
    console.log(newRestaurant);
    try {
      console.log("try 1");
      const savedRestaurant = await newRestaurant.save();
      console.log("try 2");
      const token = jwt.sign(
        { _id: savedRestaurant._id },
        process.env.TOKEN_SECRET
      );
      console.log(`Token is: ${token}`);
      res.header("Authorisation", token).send("Registered!");
    } catch (error) {
      console.log("Could not return");
      console.log(error);
      res.status(400).send("Error: " + error);
    }
  } catch (err) {
    console.log(err);
  }
});

async function newUser(restaurant, owner, email, license, password, menuId) {
  return new Restaurant({
    restaurant,
    owner,
    email,
    license,
    password,
    menuId,
  });
}

// Login
router.post("/login", async (req, res) => {
  // Validate first
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Checking if email exists
  try {
    const user = await Restaurant.findOne({ email: req.body.email });
    if (!user) return res.status(400).err("Email does not exist");

    // Password
    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) return res.status(400).err("Invalid Password!");

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("Authorisation", token).send("Logged in!");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/logout", async (req, res) => {
  res.send("Logged Out!");
});

module.exports = router;
