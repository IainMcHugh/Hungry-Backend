const router = require("express").Router();
const jwt = require("jsonwebtoken");
var ObjectId = require('mongodb').ObjectID;

const Restaurant = require("../models/restaurant.model");
const Menu = require("../models/menu.model");

router.post("/", (req, res) => {
  // console.log(req.body.token);
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) console.log(err);
    // console.log(decoded);
    console.log(`> Decoded ID: ${decoded._id}`);
    Restaurant.findById(decoded._id, function(err, response) {
      if(err) console.log(err);
      // console.log(response);
      Menu.findById(response.menuId, function(err, result){
        if(err) console.log(err);
        // console.log(result);
        res.send(result);
      })
    });
  });
});

router.post("/add", (req, res) => {
  console.log(req.body);
  const item = req.body.item;
  const newVal = {starters: item};
  // const newVal = {starters: "mytest"};
  Menu.updateOne({_id: new ObjectId(req.body.menuid)}, {$addToSet: newVal}, (err, result) => {
    if(err) console.log(`>Error: ${err}`);
    res.send(result);
  })
});

module.exports = router;
