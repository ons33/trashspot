const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const badWordsModel = new Schema(
  {
    word: "string",
  }
);

module.exports = mongoose.model("badWords", badWordsModel);
