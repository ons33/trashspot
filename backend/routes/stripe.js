const express = require('express');
const app = express();
const { resolve } = require('path');
const router = express.Router();
const Basket = require('../models/Basket');

// Replace if using a different env file or config
const env = require('dotenv').config({ path: './.env' });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

router.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html');
  res.sendFile(path);
});

router.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.put('/create-payment-intent/:userId', async (req, res) => {
  console.log('param : ', req.params.userId);
  const basket = await Basket.findOne({ user: req.params.userId });
  console.log(basket);
  try {
    let paymentIntent = await stripe.paymentIntents.create({
      currency: 'EUR',
      amount: Math.floor(basket.totalPrice) * 100,
      automatic_payment_methods: { enabled: true },
    });
    
    // Send publishable key and PaymentIntent details to client
    console.log(paymentIntent);
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
