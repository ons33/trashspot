var express = require("express");
const { addComment, getComments } = require("../controllers/commentController");
var router = express.Router();

//add a new comment
router.post("/addComment", addComment);

//get comments per product
router.get("/getComments/:id", getComments);
module.exports = router;