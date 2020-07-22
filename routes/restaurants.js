const router = require('express').Router();
let Restaurant = require('../models/restaurant.model');

router.route('/').get((req, res) => {
    Restaurant.find()
    .then(restaurant => res.json(restaurant))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const restaurant = req.body.restaurant;
    const owner = req.body.owner;
    const email = req.body.email;
    const license = req.body.license;
    const password = req.body.password;
    const newRestaurant = new Restaurant({restaurant, owner, email, license, password});

    newRestaurant.save()
    .then(() => res.json('New Restaurant added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;