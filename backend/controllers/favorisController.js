const favorisModel = require("../models/favorisModel");
const FavorisModel = require("../models/favorisModel");
const usersModels = require("../models/users.models");
const productModel = require("../models/productModel");
//add or update favoris of a connected user
const addFavoris = async (req, res) => {
  try {
    //console.log(req.body);
    favoris = await FavorisModel.findOne({ username: req.body.username });
    if (favoris) {
      // favoris.productsFavoris.forEach(element => {
      //     if(element == req.body.username){

      //     }
      // });

      //console.log(req.body.productsFavoris._id);
      const index = favoris.productsFavoris.findIndex(
        (item) => item.toString() === req.body.productsFavoris._id.toString()
      );
      //console.log(index);
      //console.log(favoris.productsFavoris[0].toString());
      if (index !== -1) {
        //console.log("hhhhhhhhhhhhhhhhhhhhhhhh");
        favoris.productsFavoris.splice(index, 1);
        favoris.save();
        //await productModel.findByIdAndUpdate(req.body.productsFavoris._id, {isFavorite: false});
      } else {
        favoris.productsFavoris.push(req.body.productsFavoris);
        await FavorisModel.findOneAndUpdate(
          { username: req.body.username },
          {
            username: req.body.username,
            productsFavoris: favoris.productsFavoris,
          }
        );
        console.log(req.body.productsFavoris);
        //await productModel.findByIdAndUpdate(req.body.productsFavoris._id, {isFavorite: true});
      }
    } else {
      await FavorisModel.create({
        username: req.body.username,
        productsFavoris: req.body.productsFavoris,
      });
      console.log("hhhhh");
      console.log(req.body.productsFavoris._id);
      //await productModel.findByIdAndUpdate(req.body.productsFavoris._id, {isFavorite: true});
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//get all favoris
const getFavoris = async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const favorisList = await favorisModel.findOne({ username: id });
    let listProducts = [];
    for (const element of favorisList.productsFavoris) {
      const elt = await productModel.findOne({ _id: element });
      listProducts.push(elt);
    }
    console.log(listProducts);
    //console.log(favorisList);
    //res.status(200).json(favorisList.productsFavoris);
    res.status(200).json(listProducts);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { addFavoris, getFavoris };
