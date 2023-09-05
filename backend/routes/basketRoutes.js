const express = require('express');
const router = express.Router();

const {
  addToBasket,
  getBasket,
  updateBasket,
} = require('../controllers/basketController');

// Add product to a basket
router.post('/add', async (req, res) => {
  const { productId, price, quantity, userId } = req.body;

  try {
    const basket = await addToBasket(productId, price, quantity, userId);
    res.status(200).json(basket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product to basket' });
  }
});

router.put('/', async (req, res) => {
  try {
    const basket = req.body;
    const basketUpdate = await updateBasket(basket);
    res.status(200).json(basketUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const basket = await getBasket(userId);
    res.status(200).json(basket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/test/test', (req, res) => {
  console.log('test done');
});

router.delete('/:id', async (req, res) => {
  try {
    let { id } = req.params;
    let deletedDocument = await Basket.findOneAndDelete({
      _id: id,
    });
    res.status(200).json(deletedDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/test/test', (req, res) => {
  console.log('test done');
});

module.exports = router;
