const GalleryModel = require("../models/galleryModel");
const ProductModel = require("../models/productModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

const uploadImageGallery = async (req, res) => {
  try {
    //console.log(req.body);
    const { product, images } = req.body;
    //console.log(product);
    console.log(images[0]);
    // const results = await cloudinary.uploader.upload(images[0].image, {
    //   folder: "productGallery",
    // });
    const results = await Promise.all(
      images.map(image =>
        cloudinary.uploader.upload(image.image, {
          folder: "productGallery",
        })
      )
    );
    //console.log(results);
    const imageDocs = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    //console.log(imageDocs);
    const gallery = await GalleryModel.create({
      product: product,
      images: imageDocs,
    });
    res.status(200).json("done");
  } catch (error) {
    res.json(error);
  }
};
//get gallery of a product 
const getGalleryProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await GalleryModel.find({product: id});
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  uploadImageGallery,
  getGalleryProduct
};
