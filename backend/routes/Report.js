var express = require("express");
const { getReport,createReport,getbadWordsList, deleteReport, updateReport, get1Report,getAllReports,AddBadWord}=require("../controllers/SupportController")
var router = express.Router();


router.get("/getReport/:idUser", getReport);

router.get("/getAllReports", getAllReports);

router.post("/addReport", createReport);


router.delete("/deleteReport/:id", deleteReport);


router.get("/getonlyoneReport/:id", get1Report);

router.put("/updateReport/:id", updateReport);

router.post("/addWord", AddBadWord);


router.get("/getwords",getbadWordsList);

module.exports = router;