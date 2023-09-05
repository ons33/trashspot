var express = require("express");
const {
  createProduct,
  uploadImageProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  updatePicture,
  getAllProducts,
  getAllProductsFilter,
  getAllProductsSortedByPrice,
  getAllProductsSortedByDate,
  getProductsById,
  getPromoProducts
} = require("../controllers/productController");
var router = express.Router();

//get user products
router.get("/getProducts/:idUser", getProducts);

//get product by id
router.get("/getProductsById/:id", getProductsById);

//get all products
router.get("/getAllProducts", getAllProducts);

//get Filtered products
router.get("/getAllProductsFilter", getAllProductsFilter);

//get Sorted products by price
router.get("/getAllProductsSortedByPrice", getAllProductsSortedByPrice);

//get Sorted products by expiry date
router.get("/getAllProductsSortedByDate", getAllProductsSortedByDate);

//get promo products
router.get("/getPromoProducts", getPromoProducts);

//Post a new product
router.post("/addProduct", createProduct);

//Post a new product picture
router.post("/uploadImageProduct", uploadImageProduct);

//delete a product
router.delete("/deleteProduct/:id", deleteProduct);

//get single product
router.get("/getSingleProduct/:id", getSingleProduct);

//update product
router.put("/updateProduct/:id", updateProduct);

//updatePicture
router.put("/updatePicture/:id", updatePicture);

module.exports = router;
