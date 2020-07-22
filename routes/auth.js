const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Restaurant = require("../models/restaurant.model");
const {
  registerValidation,
  loginValidation,
} = require("../models/validation.model");

router.posts("/register", async (req, res) => {
  // Validate first
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Checking if user is already in the database
  const emailExist = await Restaurant.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(req.body.password, salt);

  const restaurant = req.body.restaurant;
  const owner = req.body.owner;
  const email = req.body.email;
  const license = req.body.license;
  const password = hashPwd;
  const newRestaurant = new Restaurant({
    restaurant,
    owner,
    email,
    license,
    password,
  });

  try {
    const savedRestaurant = await newRestaurant
      .save()
      .then(() => res.send(savedRestaurant));
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});

// Login
router.post("/login", async (req, res) => {
  // Validate first
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Checking if email exists
  const user = await Restaurant.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does not exists");

  // Password 
    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if(!validPwd) return res.status(400).send("Invalid Password!");

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send("Logged in!");
});

module.exports = router;
