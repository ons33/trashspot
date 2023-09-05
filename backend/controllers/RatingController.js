const RatingModel = require("../models/rating");
const mongoose = require("mongoose");
const UserModel = require('../models/users.models');



const getRating = async (req, res) => {
  const { idUser } = req.params;
  const Rating = await RatingModel.find({username: idUser}).sort({ createdAt: -1 });
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(Rating);
};



const getRatingStar = async (req, res) => {
  const { idUser } = req.params;
  const Rating = await RatingModel.find({username: idUser},'star')
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(Rating);
};


const getAllRatings = async (req, res) => {
  const Rating = await RatingModel.find({});
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(Rating);
};


const createRating = async (req, res) => {
  const { id } = req.body;
  console.log("el id ouselchi ell back?"+id)
  const user = await UserModel.findOne({ _id: id });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    const Rating = new RatingModel({
      ...req.body,
      userId: user._id,
    });
    await Rating.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};




const deleteRating = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Rating exists" });
  }

  const Rating = await RatingModel.findOneAndDelete({ _id: id });

  if (!Rating) {
    return res.status(400).json({ error: "No such Rating exists mate" });
  }
  res.status(200).json(Rating);
};


const get1Rating = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await RatingModel.findById(id);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};




module.exports = { getRating,createRating, deleteRating,get1Rating,getAllRatings,getRatingStar};