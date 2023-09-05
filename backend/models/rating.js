const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users.models");

const RatingSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    star: {
      type: "Number",

    },
    experience: {
      type: String,
    },
    date: {
        type: Date,
        default: Date.now
      }

    }
  
);

module.exports = mongoose.model("Rating", RatingSchema);