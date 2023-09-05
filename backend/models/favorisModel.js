const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users.models");
const Product = require("./productModel");
const FavorisSchema = new Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    productsFavoris: [{ type: mongoose.Schema.Types.ObjectId, ref: Product }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favoris", FavorisSchema);
