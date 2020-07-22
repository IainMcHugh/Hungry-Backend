const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    restaurant: { type: String, required: true },
    data: { type: String, required: true }
  },
  { timestamps: true }
);

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;