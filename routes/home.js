const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Menu = require("../models/menu.model");

router.post("/", (req, res) => {
  console.log(req.body.token);
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) console.log(err);
    console.log("WE MADE IT!");
    console.log(decoded);
    // check for restaurant menu
    Menu.find().then((result) => {
      res.send(result);
    });
  });
});

module.exports = router;
