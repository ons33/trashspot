const { exists } = require('../models/users.models');
const UserModel = require('../models/users.models');
const validatorRegister = require('../validation/Register');
const validateLogin = require('../validation/Login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
const crypto = require('crypto');
const resetPasswordToken = require('../models/resetPasswordToken');
const sendMail = require('../utils/sendEmail');
const ValidateProfile = require('../validation/Profile');
const axios = require('axios');



const Register = async (req, res) => {
  console.log('ena ons');
  const { errors, isValid } = await validatorRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = 'user exist';
          res.status(404).json(errors);
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10);
          req.body.password = hash;
          // req.body.role = "USER";
          user = await UserModel.create(req.body);
          generateResetToken(user._id, user.email);
          res.status(200).json({ message: 'success', obj: user });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }

  //await res.send('ok')
};

const generateResetToken = async (userid, email) => {
  tokken = crypto.randomBytes(32).toString('hex');
  await resetPasswordToken.create({ userId: userid, token: tokken });

  const url = `https://the-bosses-pi-dev-h2f8.vercel.app/verify?id=${userid}&token=${tokken}`
  if (sendMail(email, url)) {
    console.log('mchet');
  } else {
    console.log('mamchetech');
  }
};


const LoginFbGoogle = (req,res)=>{
 console.log("hedha l userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",req.body)
 if( Object.keys(req.body).length > 0 ){
  var {googleId,email,firstName,lastName} = req.body
 
  if (!firstName){
    firstName = req.body.name.givenName;
   
    lastName = req.body.name.familyName;
    email = req.body.emails[0].value;
    googleId = req.body.id;
  }


  try{
    const userTest = UserModel.findOne({googleId:googleId,lastName:lastName,email:email,firstName:firstName}).then((user) => {
      if (user){
        
        var token = jwt.sign(
          {
            id: user._id,

            role: user.role,
          },
          process.env.PRIVATE_KEY,
          { expiresIn: '90h' }
        );
        res.status(200).json({
          message: 'success',
          token: 'Bearer ' + token,
        });
      }else{
       
        res.status(403).json("not found");
      }
    })

  }catch (error) {
   
    res.status(400).json("Bad request");
  }
}
else{
  res.status(400).json("faceboookkkkk");
}
}

const Login = async (req, res) => {
  const { errors, isValid } = await validateLogin(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          errors.email = 'not found user';
          res.status(404).json(errors);
        } else {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (!isMatch) {
              errors.password = 'incorrect password';
              res.status(404).json(errors);
            } else {
              resetPasswordToken
                .findOne({ userId: user._id })
                .then((notValid) => {
                  if (notValid) {
                    res.status(403).json({
                      message:
                        'Please Verify your account before loggin (check email)',
                    });
                  } else {
                    if (user.isValid == false) {
                      user.deleteOne();
                      res.status(403).json({
                        message: 'user is not found',
                      });
                    } else {
                      var token = jwt.sign(
                        {
                          id: user._id,

                          role: user.role,
                        },
                        process.env.PRIVATE_KEY,
                        { expiresIn: '90h' }
                      );
                      res.status(200).json({
                        message: 'success',
                        token: 'Bearer ' + token,
                      });
                    }
                  }
                });
            }
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const Test = (req, res) => {
  res.send(req.user);
};

const Admin = (req, res) => {
  res.send(req.user);
};

/* Profile */
const AddProfile = async (req, res) => {
  const { errors, isValid } = ValidateProfile(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ user: req.user.id }).then(async (profile) => {
        if (!profile) {
          req.body.user = req.user.id;
          await UserModel.create(req.body);
          res.status(200).json({ message: 'success' });
        } else {
          await UserModel.findOneAndUpdate({ _id: profile._id }, req.body, {
            new: true,
          }).then((result) => {
            res.status(200).json(result);
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// const updateProfile = async (req, res) => {
//   try {
//     //
//     // if ('password' in req.body) {
//     //   const hash = bcrypt.hashSync(req.body.password, 10);
//     //   req.body.password = hash;
//     //   console.log('password')
//     // }
//     console.log(req.body);
//     const data = await UserModel.findByIdAndUpdate(req.user._id, {
//       $set: req.body,
//     });
//     res.status(200).json(await UserModel.findById(req.user._id));
//   } catch (error) {
//     res.json(error);
//   }
// };
const updateProfile = async (req, res, next) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json(Object.keys(req.body));
  } catch (error) {
    res.json(error);
  }
};
const updateUser = async (req, res) => {
  console.log("aaaaaaaaaaah")
    try {
      await UserModel.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.status(200).json(Object.keys(req.body));
    } catch (error) {
      res.json(error);
    }
  
};

const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    console.log(
      'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    console.log(image);
    const result = await cloudinary.uploader.upload(image, {
      folder: 'profilePictures',
    });
    const profile = await UserModel.findByIdAndUpdate(req.params.id, {
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(200).json('done');
  } catch (error) {
    res.json(error);
  }
};

const loginImage = async (req, res) => {
  try {
    const { image } = req.body;
    const id = req.user._id;
    const result = await cloudinary.uploader.upload(image, {
      folder: 'loginPictures',
    });
    const url = result.secure_url;
    console.log(url);
    //  await axios.post('https://c133-41-225-168-41.eu.ngrok.io/uploadImage',{"imageUrl": url, "userId": id})
    //         .then(response => {
    //             console.log(response)
    //         })
    //         .catch(error => {
    //             // return "errorr email"
    // });
    let payload = { imageUrl: url, userId: id };

    try {
      const response = await axios.post(
        'https://851e-41-225-168-41.eu.ngrok.io/uploadImage',
        payload
      );
      console.log(response.data);
      return response.json();
    } catch (error) {
      console.log(error);
    }

    console.log(result.public_id);
    console.log(id);
    //  await cloudinary.uploader.destroy(result.public_id);
    res.status(200).json('done');
  } catch (error) {
    res.json(error);
  }
};

const FindAllProfiles = async (req, res) => {
  try {
    const data = await UserModel.find().populate('user', ['email', 'role']);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const FindSingleProfile = async (req, res) => {
  try {
    const data = await UserModel.findOne({ user: req.user.id }).populate(
      'user',
      ['email', 'role']
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const DeleteProfile = async (req, res) => {
  try {
    const data = await UserModel.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ message: 'deleted', data });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const checkLoginByImage = async (req, res) => {
  try {
    const { image } = req.body;
    const result = await cloudinary.uploader.upload(image, {
      folder: 'loginPictures',
    });
    const url = result.secure_url;
    try {
      const response = await axios.post(
        'https://851e-41-225-168-41.eu.ngrok.io/checkImage',
        { imageUrl: url }
      );
      const userId = response.data['message'];
      await cloudinary.uploader.destroy(result.public_id);
      await UserModel.findById(userId).then((user) => {
        if (user) {
          console.log('logged in ' + userId);
          var token = jwt.sign(
            {
              id: user._id,
              // firstName: user.firstName,
              // lastName: user.firstName,
              // email: user.email,
              role: user.role,
            },
            process.env.PRIVATE_KEY,
            { expiresIn: '90h' }
          );
          res.status(200).json({
            message: 'success',
            token: 'Bearer ' + token,
          });
        } else {
          res.status(404).json({
            message: 'Not found',
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.json(error);
  }
};

const getUsers = async (req, res) => {
  const users = await UserModel.find({}).sort({ createdAt: -1 });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(401).json({ error: res.error });
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' });
  }

  const user = await UserModel.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  res.status(200).json(user);
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const banProfile = async (req, res) => {
  try {
    const { _id, banDuration } = req.body;
    var date = new Date();
    const profile = await UserModel.findByIdAndUpdate(
      _id,
      { $inc: { 'banned.banNumber': 1 } },
      {
        banned: {
          isBanned: true,
          banDuration: banDuration,
          banExpiresAt: date.addDays(parseInt(banDuration)),
        },
      }
    );
    res.status(200).json({ msg: 'done', obj: profile });
  } catch (error) {
    res.json(error);
  }
};

const resetpassword = async (req, res, next) => {
  try {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    const decoded = jwt.decode(req.params['token']);
    console.log(decoded.id);
    await UserModel.findOneAndUpdate(
      { _id: decoded.id },
      {
        password: passwordHash,
      }
    );

    res.json({ message: 'Password successfully changed!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const forgotpassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        success: true,
        message: 'This mail does not exist!',
      });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.PRIVATE_KEY,
      { expiresIn: '90h' }
    );
    const url = `https://the-bosses-pi-dev-h2f8.vercel.app/resetPassword/${token}`;
    if (sendMail(email, url)) {
      res.status(200).json({
        success: true,
        message: 'please check your email.',
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'sad',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};



module.exports = {
  Register,
  Login,
  Test,
  updateProfile,
  Admin,
  getUsers,
  getSingleUser,
  deleteUser,
  DeleteProfile,
  uploadImage,
  banProfile,
  resetpassword,
  forgotpassword,
  loginImage,
  checkLoginByImage,
  AddProfile,
  FindAllProfiles,
  FindSingleProfile,
  updateUser,
  LoginFbGoogle
};
