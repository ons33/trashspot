const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = new Schema(
  {
    firstName: "string",
    lastName: "string",
    password: "string",
    role: "string",
    phoneNumber: "string",
    organisationName: "string",
    street: "string",
    postalCode: "string",
    city: "string",
    state: "string",
    gender: "string",
    birthDate: "Date",
    bio: "string",
    googleId:"string",
    secret:"string",
    banned: {
      isBanned: {type : Boolean, default :false},
      banDuration: "Number",
      banExpiresAt: "Date",
      banNumber: {
        type: "Number",
        default: 0,
      },
    },
    email: {
      type: "string",
      trim: true,
      unique: true,
    },
    image: {
      public_id: {
        type: String,
        
      },
      url: {
        type: String,
        default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      },
    },
    isValid: {
      type: Boolean,
      default: false,
    },    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserModel);
