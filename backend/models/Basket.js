const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BasketSchema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      name: {type: String},
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  totalPrice: { type: Number, default: 0 },
});

module.exports = mongoose.model('Basket', BasketSchema);
