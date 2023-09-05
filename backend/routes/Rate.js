var express = require("express");
const { getRating,createRating, deleteRating, updateRating, get1Rating,getAllRatings,getRatingStar}=require("../controllers/RatingController")
var router = express.Router();


router.get("/getRating/:idUser", getRating);

router.get("/getAllRatings", getAllRatings);

router.post("/addRating", createRating);


router.delete("/deleteRating/:id", deleteRating);


router.get("/getonlyoneRating/:id", get1Rating);



router.get("/getstarRating", getRatingStar);

module.exports = router;