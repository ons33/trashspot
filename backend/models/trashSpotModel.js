const mongoose = require("mongoose");
const MyObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
// const UserModel = require('../models/users.models');
const TrashSpotModel = new Schema(
  {
    ownerId:{ type: MyObjectId, ref: 'user' },
    accessTrash:"boolean",
    trashSize: "string",
    type:"string",
      location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    importanceLevel : "string",
    image: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      description:"string",
      collected:{
        type:Boolean,
        default:false,
      },
      collected_image:{
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      frontEndLevel: "string",
      collected_at: {
        type: Date,
        default: Date.now,
      },
      collected_by:{ type: MyObjectId, ref: 'user' },
      secondary_spots: [{ type: MyObjectId, ref: 'trashSpot' }]
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model("trashSpot", TrashSpotModel);
