const router = require("express").Router();
const jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectID;

const Restaurant = require("../models/restaurant.model");
const Menu = require("../models/menu.model");

router.post("/", (req, res) => {
  // console.log(req.body.token);
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) console.log(err);
    // console.log(decoded);
    console.log(`> Decoded ID: ${decoded._id}`);
    Restaurant.findById(decoded._id, function (err, response) {
      if (err) console.log(err);
      // console.log(response);
      Menu.findById(response.menuId, function (err, result) {
        if (err) console.log(err);
        // console.log(result);
        res.send(result);
      });
    });
  });
});

router.post("/add", (req, res) => {
  // console.log(req.body);
  const item = req.body.item;
  const newVal = { starters: item };
  Menu.findOneAndUpdate(
    { _id: new ObjectId(req.body.menuid) },
    { $addToSet: newVal },
    { returnOriginal: false, useFindAndModify: false },
    (err, result) => {
      if (err) console.log(`>Error: ${err}`);
      console.log(result);
      res.send(result.starters.slice(-1)[0]);
    }
  );
});

router.post("/delete", (req, res) => {
  const menuid = req.body.menuid;
  const id = req.body.id;
  console.log(id);

  Menu.updateOne(
    { _id: new ObjectId(menuid) },
    { $pull: { starters: { _id: ObjectId(id) } } },
    (err, result) => {
      if (err) res.status(400).err(err);
      res.status(200).send(result);
    }
  );
});

module.exports = router;
