const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users.models");

const SupportSchema = new Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    subject: {
      type: String,

    },
    state: {
      type: String,
      enum: ["treated", "not treated"],
      default: "not treated",
    },
    description: {
      type: String,
    },
    date: {
        type: Date,
        default: Date.now
      }

    }
  
);

module.exports = mongoose.model("Support", SupportSchema);