// const router = require('express').Router();
// let Menu = require('../models/menu.model');

// router.route('/').get((req, res) => {
//     Menu.find()
//     .then(menus => res.json(menus))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//     const restaurant = req.body.restaurant;
//     const data = req.body.data;

//     const newMenu = new Menu({restaurant, data});

//     newMenu.save()
//     .then(() => res.json('New Menu added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').get((req, res) => {
//     Menu.findById(req.params.id)
//     .then(menu => res.json(menu))
//     .catch(err => req.status(400).json('Error: ' + err));
// });

// module.exports = router;