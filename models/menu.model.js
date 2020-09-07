const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    restaurant: { type: String, required: true },
    // data: { type: String, required: true },
    starters: { type: Schema.Types.Mixed},
    mains: { type: Schema.Types.Mixed },
    deserts: { type: Schema.Types.Mixed },
    drinks: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
