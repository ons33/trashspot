const mongoose = require('mongoose');
const Delivery = require('../models/Delivery');

const addToDelivery = async (deliveryObj) => {
  try {
    let delivery = await new Delivery({
      user: deliveryObj.userId,
      adress: deliveryObj.adress,
      totalPrice: deliveryObj.totalPrice,
    });
    console.log('delivery object ', delivery);
    await delivery.save();
    return delivery;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addToDelivery,
};
