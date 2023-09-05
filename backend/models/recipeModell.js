const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  preparation: {
    type: String,
    required: true,
  },
  cooking: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: false,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  ratings: [{
    type: Number,
    min: 1,
    max: 5,
  }],
});

recipeSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) {
    return null;
  }
  const sum = this.ratings.reduce((total, rating) => total + rating, 0);
  return sum / this.ratings.length;
});

const recipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = recipeModel;