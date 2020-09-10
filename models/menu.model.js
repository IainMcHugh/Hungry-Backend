const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    restaurant: { type: String, required: true },
    // data: { type: String, required: true },
    starters: [new Schema({
      description: String,
      cost: String,
      allergens: [],
      kcal: String,
    }, {strict: false })],
    mains: { type: Schema.Types.Mixed },
    deserts: { type: Schema.Types.Mixed },
    drinks: { type: Schema.Types.Mixed }, 
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
