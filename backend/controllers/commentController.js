const mongoose = require("mongoose");
const CommentModel = require("../models/commentModel");
//add a new comment
const addComment = async (req, res) => {
  try {
    console.log(req.body);
    commentaires = await CommentModel.findOne({ username: req.body.username, product: req.body.product });
    if (commentaires) {
        commentaires.comments.push(req.body.comments);
        await commentaires.save();
    } else {
      comment = await CommentModel.create({
        username: req.body.username,
        product: req.body.product,
        comments: req.body.comments,
      });
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//get comments 
const getComments = async (req, res) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const commentList = await CommentModel.findOne({ product: id });
      let listComments = [];
      for (const element of commentList.comments) {
        listComments.push(element);
      }
      res.status(200).json(listComments);
    } catch (error) {
      res.status(404).json(error.message);
    }
  };
module.exports = { addComment, getComments };
