const ProductModal = require("../models/productModel");

async function automaticUpdateProduct() {
  try {
    const today = new Date();
    today.setDate(today.getDate() + 5);
    const expiredProducts = await ProductModal.find({
      expiry_date: {
        $lte: today,
        $gt: new Date(),
      },
    });
    if (expiredProducts.length !== 0) {
      expiredProducts.forEach(async (product) => {
        if(product.isValid !== true){
          await ProductModal.findByIdAndUpdate(product._id, { isValid: true, price: (product.promo * product.price)/100 });
        }
        });
    }
    // Find all non-expired products and update their isValid property to false
    await ProductModal.updateMany(
      { _id: { $nin: expiredProducts.map((p) => p._id) } },
      { isValid: false , price: product.price}
    );
  } catch (error) {
    return false;
  }
  return true;
}

module.exports = automaticUpdateProduct;
