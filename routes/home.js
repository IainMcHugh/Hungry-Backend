const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Restaurant = require("../models/restaurant.model");
const Menu = require("../models/menu.model");

router.post("/", (req, res) => {
  console.log(req.body.token);
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) console.log(err);
    console.log(decoded);
    console.log(`Decoded ID: ${decoded._id}`);
    Restaurant.findById(decoded._id, function(err, response) {
      if(err) console.log(err);
      console.log(response);
      Menu.findById(response.menuId, function(err, result){
        if(err) console.log(err);
        console.log(result);
        res.send(result);
      })
    });
  });
});

module.exports = router;
