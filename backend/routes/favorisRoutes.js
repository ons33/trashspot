var express = require("express");
const { addFavoris, getFavoris } = require("../controllers/favorisController");
var router = express.Router();

//Post or update a new favoris
router.post("/addFavoris", addFavoris);

//get all favoris of the user connected
router.get("/getFavoris/:id", getFavoris);

module.exports = router;