const ProductModel = require("../models/productModel");
const mongoose = require("mongoose");
const validatorProduct = require("../validation/Product");
const cloudinary = require("../utils/cloudinary");
const FavorisModel = require("../models/favorisModel");

//get user products
const getProducts = async (req, res) => {
  const { idUser } = req.params;
  const products = await ProductModel.find({ username: idUser }).sort({
    createdAt: -1,
  });
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(products);
};

//get products by idProduct
const getProductsById = async (req, res) => {
  const { id } = req.params;
  const products = await ProductModel.findOne({ _id: id });
  res.status(200).json(products);
};

//get all products
const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({}).sort({ createdAt: -1 });
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(products);
};

//get Filtered products
const getAllProductsFilter = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    let products;
    if (minPrice && maxPrice) {
      products = await ProductModel.find({
        price: { $gte: minPrice, $lte: maxPrice },
      });
    } else {
      products = await ProductModel.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get products sorted by price
const getAllProductsSortedByPrice = async (req, res) => {
  const products = await ProductModel.find({}).sort({ price: 1 });
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(products);
};

//get products sorted by expiry date
const getAllProductsSortedByDate = async (req, res) => {
  const products = await ProductModel.find({}).sort({ expiry_date: -1 });
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(products);
};

//get products en promo
const getPromoProducts = async (req, res) => {
  const today = new Date();
  today.setDate(today.getDate() + 5);
  const expiredProducts = await ProductModel.find({
    expiry_date: {
      $lte: today,
      $gt: new Date(),
    },
    promo: { $gt: 0 },
  });
  res.status(200).json(expiredProducts);
};

//create a new product
const createProduct = async (req, res) => {
  const { errors, isValid } = await validatorProduct(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      product = await ProductModel.create(req.body);
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//create a new product picture
const uploadImageProduct = async (req, res) => {
  try {
    const { image } = req.body;
    const result = await cloudinary.uploader.upload(image, {
      folder: "productPictures",
    });

    const products = await ProductModel.find({}).sort({ createdAt: -1 });

    const picture = await ProductModel.findByIdAndUpdate(products[0]._id, {
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    res.json(error);
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  const favorisList = await FavorisModel.find({});
  favorisList.forEach((element)=> {
    for(i=0; i<element.productsFavoris.length; i++){
      if (element.productsFavoris[i] == id){
        element.productsFavoris.splice(i, 1);
        element.save();
      }
    }
  })
  const product = await ProductModel.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

//get a single product
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ProductModel.findById(id);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//update product
const updateProduct = async (req, res, next) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json(Object.keys(req.body));
  } catch (error) {
    res.json(error);
  }
};

//update picture
const updatePicture = async (req, res) => {
  try {
    const { image } = req.body;
    const result = await cloudinary.uploader.upload(image, {
      folder: "productPictures",
    });
    const picture = await ProductModel.findByIdAndUpdate(req.params.id, {
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getProducts,
  createProduct,
  uploadImageProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  updatePicture,
  getAllProducts,
  getAllProductsFilter,
  getAllProductsSortedByPrice,
  getAllProductsSortedByDate,
  getProductsById,
  getPromoProducts,
};
