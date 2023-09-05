const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./productModel");
const User = require("./users.models");
const CommentSchema = new Schema(
  {
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const CommentsSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentsSchema);
