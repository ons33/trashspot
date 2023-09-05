const trashSpot = require("../models/trashSpotModel")
const UserModel = require("../models/users.models")
const cloudinary = require('../utils/cloudinary');


const addTrashSpot = async (req,res) =>{
    try {
        const {idTrash,image,type,position,accessTrash,trashSize,description} = req.body
        const coordinates ={ type: 'Point', coordinates: [position.lat,position.long]}
        const ownerId = req.user._id
        var requestUpdate = {type:type,location:coordinates,description:description,accessTrash:accessTrash,trashSize:trashSize}
        if (image.length>5){
            const result = await cloudinary.uploader.upload(image, {
              folder: 'trashSpotImages',
            });
            const imageUploaded = {
                public_id: result.public_id,
                url: result.secure_url,
              }
            requestUpdate = {image:imageUploaded,type:type,location:coordinates,description:description,accessTrash:accessTrash,trashSize:trashSize}
        }
          var data;
        if (idTrash!=-1){
         data = await trashSpot.findOneAndUpdate({ownerId:ownerId,_id:idTrash},requestUpdate,{
            new:true
        }).populate({
            path: 'ownerId',
            model: UserModel,
            select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
         }).populate({
            path: 'collected_by',
            model: UserModel,
            select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
         }).populate({
            path:'secondary_spots',
            model:trashSpot,
            populate : [{
                path : 'ownerId',
                model: UserModel,
              },{
                path : 'collected_by',
                model: UserModel,
            }]
         })
        if (data.importanceLevel=="secondary"){
        const updatedPrimary = await trashSpot.findOneAndUpdate(
            { secondary_spots: { $all: [idTrash] } },
            { new: true }
          ).populate({
            path: 'ownerId',
            model: UserModel,
            select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
         }).populate({
            path: 'collected_by',
            model: UserModel,
            select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
         }).populate({
            path:'secondary_spots',
            model:trashSpot,
            populate : [{
                path : 'ownerId',
                model: UserModel,
              },{
                path : 'collected_by',
                model: UserModel,
            }]
         })
         res.send(updatedPrimary)
        }else{

            res.send(data)
        }
        }else{
        const primary_spot = await checkPrimaryOrSecondarySpot(coordinates.coordinates)
        if (primary_spot.length>0)
            importanceLevel = "secondary"
        else
            importanceLevel = "primary"
        data = await trashSpot.create({ownerId:ownerId,importanceLevel:importanceLevel,frontEndLevel:importanceLevel,...requestUpdate})
        data = await data.populate({
            path: 'ownerId',
            model: UserModel,
            select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
        });
        if (primary_spot.length>0){
            const spot = await trashSpot.findById(primary_spot[0]._id)
            spot.secondary_spots.push(data._id)
            spot.save()
         console.log(primary_spot[0])
            res.send(await trashSpot.findById(primary_spot[0]._id).populate({
                path: 'ownerId',
                model: UserModel,
                select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
             }).populate({
                path: 'collected_by',
                model: UserModel,
                select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
             }).populate({
                path:'secondary_spots',
                model:trashSpot,
                populate : [{
                    path : 'ownerId',
                    model: UserModel,
                  },{
                    path : 'collected_by',
                    model: UserModel,
                }]
             }))
        }else{
            console.log(data)
            res.send(data)
        }
        }
        
    } catch (error) {
        res.send("error")
    }
}

// 5460
//1.704898666666667e-5 hedha l in between 78k w 117k
    // 1 between akl bin l 10 w 12 yjiw 78206 meters /// 0.00001278674 hedha maaneha 1 metre , 0.00001278674*1000 = 0.01278674km
    // 1 between akl bin l 32 w 37 yjiw 117385.3 meters /// 
    

const checkPrimaryOrSecondarySpot = async(coords) =>{
      const primarySpot = await trashSpot.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: coords // Mapbox coordinate in latitude-longitude order
            },
            distanceField: "distance",
            query: { importanceLevel: "primary" },
            spherical: true,
            maxDistance: 1100 // maximum distance in meters
          }
        }
      ])
        return primarySpot
}

const getAllTrashSpots = async (req,res) =>{
    try {
            const data = await trashSpot.find({importanceLevel:"primary"}).populate({
                path: 'ownerId',
                model: UserModel,
                select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
             }).populate({
                path: 'collected_by',
                model: UserModel,
                select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
             }).populate({
                path:'secondary_spots',
                model:trashSpot,
                populate : [{
                    path : 'ownerId',
                    model: UserModel,
                  },{
                    path : 'collected_by',
                    model: UserModel,
                }]
             });
            res.send(data)
    } catch (error) {
        res.send("error")
    }
}

const collectTrash = async (req,res) =>{
    try {
        const {id,image,honorSign,collectedBy} = req.body
        console.log("test collect")
        const result = await cloudinary.uploader.upload(image, {
          folder: 'trashSpotCollectedImages',
        });
        const imageUploaded = {
            public_id: result.public_id,
            url: result.secure_url,
          }
          console.log("image uploaded")
        if (honorSign){
            const result = await trashSpot.findByIdAndUpdate( { _id: id },{collected_image:imageUploaded,collected_by:collectedBy,collected:true,collected_at: new Date()},{new: true}).populate({
                path: 'ownerId',
                model: UserModel,
                select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
             }).populate({
                path: 'collected_by',
                model: UserModel,
                select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
             }).populate({
                path:'secondary_spots',
                model:trashSpot,
                populate : [{
                    path : 'ownerId',
                    model: UserModel,
                  },{
                    path : 'collected_by',
                    model: UserModel,
                }]
             });
             if (result.importanceLevel == "primary"){
                 res.send(result)
             }else{
                const updatedPrimary = await trashSpot.findOneAndUpdate(
                    { secondary_spots: { $all: [id] } },
                    { new: true }
                  ).populate({
                    path: 'ownerId',
                    model: UserModel,
                    select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
                 }).populate({
                    path: 'collected_by',
                    model: UserModel,
                    select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
                 }).populate({
                    path:'secondary_spots',
                    model:trashSpot,
                    populate : [{
                        path : 'ownerId',
                        model: UserModel,
                      },{
                        path : 'collected_by',
                        model: UserModel,
                    }]
                 })
                 res.send(updatedPrimary)
             }
        }else{
            res.send("error")
        }

    } catch (error) {
        res.send("error")
    }
}

const deleteATrashSpot = async (req,res) =>{
    try {
            const {id} = req.body
            const trash = await trashSpot.findOne({_id:id,ownerId:req.user._id})
            if (trash){
                if (trash.importanceLevel == "primary" && trash.secondary_spots.length>0){
                    const new_primary = await trashSpot.findOne(trash.secondary_spots[0])
                    console.log(trash.secondary_spots)
                    let old_list = trash.secondary_spots
                    let new_secondary = old_list.splice(0,1)
                    new_primary.importanceLevel = "primary"
                    new_primary.frontEndLevel = "primary"
                    new_primary.secondary_spots = old_list
                    await new_primary.save()
                    const populatedPrimary = await trashSpot
                    .findById(new_primary._id).populate({
                        path: 'ownerId',
                        model: UserModel,
                        select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
                     })
                    .populate({
                        path: 'collected_by',
                        model: UserModel,
                        select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
                    })
                    .populate({
                        path:'secondary_spots',
                        model:trashSpot,
                        populate : [{
                        path : 'ownerId',
                        model: UserModel,
                        },{
                        path : 'collected_by',
                        model: UserModel,
                        }]
                    });
                    await trashSpot.findByIdAndDelete(id);
                    res.send(populatedPrimary);
                }else{
                    if (trash.importanceLevel == "secondary"){
                        const updatedPrimary = await trashSpot.findOneAndUpdate(
                            { secondary_spots: { $all: [trash._id] } },
                            { $pull: { secondary_spots: trash._id } },
                            { new: true }
                          ).populate({
                            path: 'ownerId',
                            model: UserModel,
                            select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
                         }).populate({
                            path: 'collected_by',
                            model: UserModel,
                            select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
                         }).populate({
                            path:'secondary_spots',
                            model:trashSpot,
                            populate : [{
                                path : 'ownerId',
                                model: UserModel,
                              },{
                                path : 'collected_by',
                                model: UserModel,
                            }]
                         })
                        await trashSpot.findByIdAndDelete(id)
                        console.log(updatedPrimary)
                        res.send(updatedPrimary)
                    }else{
                        await trashSpot.findByIdAndDelete(id)
                        console.log("deleted id")
                        res.send({_id:id})
                    }
                }
            }else{
                await trashSpot.findByIdAndDelete(id)
                console.log("deleted error")
                res.send("error")
            }
            
    } catch (error) {
        console.log("deleted 123",error)
        res.send("error")
    }
}

const getTrashRanks = async (req,res) =>{
    try {
        var finalResult = []
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); 
        const ownerIds =await trashSpot.find({ createdAt: { $gte: sevenDaysAgo } }).distinct("ownerId")
    for (let id of ownerIds){
        const person =  await  UserModel.findById(id,{firstName:1,lastName:1,email:1, _id:1})
        var dataperson = {}
        dataperson["id"] = person.id
        dataperson["firstName"] = person.firstName
        dataperson["lastName"] = person.lastName
        dataperson["email"] = person.email
        dataperson["countCollectedTrash"] = 0
        dataperson["pointsOfCollectedTrash"] = 0
       await  trashSpot.find({ createdAt: { $gte: sevenDaysAgo } }).count({ownerId:person._id}).then((result) =>{
            dataperson["countPostedTrash"] = result
            dataperson["pointsOfPostedTrash"] = result * 10
        }) 
        dataperson["totalPoints"] = dataperson["pointsOfPostedTrash"]
        finalResult.push(dataperson)

    }
    const collected_by = await trashSpot.find({ updatedAt: { $gte: sevenDaysAgo } }).distinct("collected_by")
    for (let id of collected_by){
        let indexInFinalResult = finalResult.findIndex(per => per.id == id)
        let dataperson = {}
        const countCollected = await  trashSpot.find({ updatedAt: { $gte: sevenDaysAgo } }).count({collected_by:id})
        dataperson["countCollectedTrash"] = countCollected
        dataperson["pointsOfCollectedTrash"] = countCollected * 50
        if (indexInFinalResult>-1){
            finalResult[indexInFinalResult]["countCollectedTrash"] = dataperson["countCollectedTrash"]
            finalResult[indexInFinalResult]["pointsOfCollectedTrash"] = dataperson["pointsOfCollectedTrash"]
            finalResult[indexInFinalResult]["totalPoints"] = dataperson["pointsOfCollectedTrash"] + finalResult[indexInFinalResult]["pointsOfPostedTrash"]
        }else{
            let person = await UserModel.findById(id,{firstName:1,lastName:1,email:1, _id:1})
            dataperson["id"] = person.id
            dataperson["firstName"] = person.firstName
            dataperson["lastName"] = person.lastName
            dataperson["email"] = person.email
            dataperson["countPostedTrash"] = 0
            dataperson["pointsOfPostedTrash"] = 0
            dataperson["totalPoints"] = dataperson["pointsOfCollectedTrash"]
            finalResult.push(dataperson)
        }
    }
        finalResult.sort((a, b) => (a.totalPoints > b.totalPoints ? -1 : 1))
        res.send(finalResult)
    } catch (error) {
        res.send("error")
    }

    
      
}

module.exports = { addTrashSpot,getAllTrashSpots,deleteATrashSpot,collectTrash,getTrashRanks};