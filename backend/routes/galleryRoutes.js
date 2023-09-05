var express = require("express");
const {
    uploadImageGallery,
    getGalleryProduct
} = require("../controllers/galleryController");
var router = express.Router();

//Post a new gallery
router.post("/addGallery/:id", uploadImageGallery);
//get gallery of a product 
router.get("/showGallery/:id", getGalleryProduct);

module.exports = router;