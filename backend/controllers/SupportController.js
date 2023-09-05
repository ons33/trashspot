const SupportModel = require("../models/SupportModel");
const mongoose = require("mongoose");
const UserModel = require('../models/users.models');
const badWordsModel = require('../models/badWords');



const getbadWordsList= async(req,res)=>{
  const badWords = await badWordsModel.find({});
  const badWordList = badWords.map((bw) => bw.word);
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(badWordList);
  console.log(badWordList)
}
const AddBadWord=async(req,res)=>{

  try {
    const words = new badWordsModel({
      ...req.body,

    });
    await words.save();
    res.status(200).json({ message: "bad word added!" });
  } catch (error) {
    res.status(404).json(error.message);
  }

}

const filterBadWords =async (description) => {
  const badWords = await badWordsModel.find({});
  const badWordList = badWords.map((bw) => bw.word);
  console.log(badWordList);
  const words = description.split(" ");
  const filteredWords = words.map((word) => {
    if (badWordList.includes(word.toLowerCase())) {
      return "*".repeat(word.length);
    } else {
      return word;
    }
  });
  return filteredWords.join(" ");
}



const getReport = async (req, res) => {
  const { idUser } = req.params;
  const Report = await SupportModel.find({username: idUser}).sort({ createdAt: -1 });
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(Report);
};


const getAllReports = async (req, res) => {
  const Report = await SupportModel.find({});
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(Report);
};


const createReport = async (req, res) => {
  const {email} = req.body;
  console.log("hedha el email ell back "+email)
  const user = await UserModel.findOne({email});
  const {description}=req.body;
  //console.log("**"+{description})
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    const filteredDescription = await filterBadWords(description);
    const report = new SupportModel({
      ...req.body,
      username: user._id,
      description: filteredDescription,

    });
    await report.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};




const deleteReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such report exists" });
  }

  const report = await SupportModel.findOneAndDelete({ _id: id });

  if (!report) {
    return res.status(400).json({ error: "No such report exists mate" });
  }
  res.status(200).json(report);
};


const get1Report = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await SupportModel.findById(id);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};


const updateReport = async (req, res, next) => {
  try {
    await SupportModel.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json(Object.keys(req.body));
  } catch (error) {
    res.json(error);
  }
};


module.exports = { getReport,createReport, deleteReport, updateReport, get1Report,getAllReports,AddBadWord,getbadWordsList};