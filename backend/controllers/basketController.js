const Basket = require('../models/Basket');
const mongoose = require('mongoose');
const Product = require('../models/productModel');

const addToBasket = async (productId, price, quantity, userId) => {
  const ObjectId = mongoose.Types.ObjectId;
  let objectProductId = new ObjectId(productId);
  let prod = await Product.findById(productId).exec();
  let name = prod.brand;
  console.log('name ', name);
  try {
    const basketQuery = Basket.where({ user: userId });
    let basket = await basketQuery.findOne();
    //basket exists
    if (basket) {
      const productQuery = (product, productId) =>
        product.productId === productId;
      const productIndex = basket.products.findIndex((product) => {
        return product.productId.equals(productId);
      });

      //product exists
      if (productIndex > -1) {
        let prod = basket.products[productIndex];
        prod.quantity += quantity;
        prod.price = prod.price * quantity;
        basket.totalPrice += prod.price;
      } else {
        basket.products.push({ productId,name, price, quantity });
        basket.totalPrice += price;
      }

      basket = await basket.save();
    } else {
      const newBasket = new Basket({
        user: userId,
        products: [{ productId, name, price, quantity }],
        totalPrice: price,
      });

      await newBasket.save();

      return newBasket;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add product to basket');
  }
};

const updateBasket = async (basket) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    let objectBaskettId = new ObjectId(basket._id);
    const doc = await Basket.findById(objectBaskettId);
    console.log('basket before update', basket);
    let totalPrice = 0;
    basket.products.forEach((p) => (totalPrice += p.price * p.quantity));
    console.log('total price ', totalPrice);
    basket.totalPrice = totalPrice;
    let basketDB = await Basket.findByIdAndUpdate(
      objectBaskettId,
      {
        $set: basket,
      },
      { new: true }
    );
    let basketRes = await Basket.findById(basket.user);
    return basketRes;
  } catch (error) {
    throw new Error('Failed to update basket');
  }
};

const getBasket = async (userId) => {
  try {
    const basket = await Basket.findOne({ user: userId }).populate(
      'products.productId',
      'name price'
    );

    if (!basket) {
      throw new Error('Basket not found');
    }

    return basket;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get basket');
  }
};

module.exports = {
  addToBasket,
  getBasket,
  updateBasket,
};
