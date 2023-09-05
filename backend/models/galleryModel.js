const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./productModel");

const ImageSchema = new Schema(
  {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

const GallerySchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
    },
    images: [ImageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);
