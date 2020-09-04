const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    restaurant: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6,
    },
    owner: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6,
    },
    license: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6
    },
    menuId: {
      type: String,
    }
  },
  { timestamps: true }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;