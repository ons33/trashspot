const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  adress : {type: String},
  totalPrice: { type: Number, default: 0 },
});

module.exports = mongoose.model('Delivery', DeliverySchema);
