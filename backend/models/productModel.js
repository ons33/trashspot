const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users.models");

const ProductSchema = new Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    category: {
      type: String,
      //required: true,
      default: "OTHER"
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      //required: true,
    },
    image: {
      public_id: {
        type: String,
        //required: true,
        //default: "default_public_id"
      },
      url: {
        type: String,
        //required: true,
        //default: "default_url"
      },
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    // isFavorite: { 
    //   type: Boolean,
    //   default: false,
    // },
    promo: {
      type: Number,
      default: 50
      //required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
