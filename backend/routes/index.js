var express = require('express');
const {
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
  FindSingleProfile,
  FindAllProfiles,
  updateUser,
  LoginFbGoogle,
} = require('../controllers/users.controllers');

const {
  addTrashSpot,
  getAllTrashSpots,
  deleteATrashSpot,
  collectTrash,
  getTrashRanks,
} = require('../controllers/trashSpot.controllers');
const { ROLES, inRole } = require('../security/RoleMiddleware');
const passport = require('passport');
const resetPasswordToken = require('../models/resetPasswordToken');
const usersModels = require('../models/users.models');
var router = express.Router();

const jwt = require('jsonwebtoken');
const CLIENT_URL = 'https://the-bosses-pi-dev-h2f8.vercel.app/';

/* users routes. */

//? sign in
router.post('/register', Register);

//? log in
router.post('/login', Login);

router.post('/resetpassword/:token', resetpassword);
router.post('/forgotpassword', forgotpassword);

//? GET all users
router.get(
  '/getUsers',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  getUsers
);

//? GET a single user

router.get(
  '/getUser/:id',
  passport.authenticate('jwt', { session: false }),
  getSingleUser
);
router.put(
  '/getImage/:id',
  passport.authenticate('jwt', { session: false }),
  uploadImage
);
router.put(
  '/loginImage',
  passport.authenticate('jwt', { session: false }),
  loginImage
);
router.put('/checkImage', checkLoginByImage);
//? DELETE a user
router.delete(
  '/deleteUser/:id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN.ADMIN),
  deleteUser
);

//? UPDATE user
router.put('/updateUser/:id', updateProfile);

/* test router */
router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.USER.PARTICULAR),
  Test
);
router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.USER),
  Admin
);
router.post(
  '/uploadImage',
  passport.authenticate('jwt', { session: false }),
  uploadImage
);
router.post(
  '/banProfile',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  banProfile
);
router.delete(
  '/profiles/:id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  DeleteProfile
);
// router.put(
//   '/updateProfile',
//   passport.authenticate('jwt', { session: false }),
//   updateProfile
// );
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  FindSingleProfile
);
router.get(
  '/profiles',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  FindAllProfiles
);
router.post(
  '/profiles',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  AddProfile
);
router.put('/updateUser/:id', updateProfile);
router.get('/verify/:user_id/:token', async function (req, res) {
  const user_id = req.params.user_id;
  const token1 = req.params.token;
  // const token_result = await resetPasswordToken.findOne({userId:user_id,token:token});
  resetPasswordToken.find({ token: token1 }).then((Valid) => {
    if (Valid.length > 0) {
      usersModels
        .findByIdAndUpdate(user_id, { isValid: true })
        .then((exists) => {
          if (exists) {
            resetPasswordToken.findOneAndRemove({ token: token1 });
            var token = jwt.sign(
              {
                id: exists._id,
                role: exists.role,
              },
              process.env.PRIVATE_KEY,
              { expiresIn: '90h' }
            );
            res.status(200).json({
              message: 'success',
              token: 'Bearer ' + token,
            });
          }
        });
    } else {
      // const user = usersModels.findByIdAndDelete(user_id);
      console.log('not valid');
      res.status(403).send('not verified');
    }
  });
});

router.post('/LoginFbGoogle', LoginFbGoogle);

router.post('/addTrashSpot',passport.authenticate('jwt', { session: false }),inRole(ROLES.PARTICULAR,ROLES.ADMIN), addTrashSpot);
router.get('/getAllTrashSpots',passport.authenticate('jwt', { session: false }),inRole(ROLES.PARTICULAR,ROLES.ADMIN), getAllTrashSpots);
router.post('/deleteATrashSpot',passport.authenticate('jwt', { session: false }),inRole(ROLES.PARTICULAR,ROLES.ADMIN), deleteATrashSpot);
router.post('/collectTrash',passport.authenticate('jwt', { session: false }),inRole(ROLES.PARTICULAR,ROLES.ADMIN), collectTrash);
router.get('/getTrashRanks',passport.authenticate('jwt', { session: false }),inRole(ROLES.PARTICULAR,ROLES.ADMIN), getTrashRanks);
// ,passport.authenticate('jwt', { session: false }),inRole(ROLES.PARTICULAR,ROLES.ADMIN)
// ,passport.authenticate('jwt', { session: false }),inRole(ROLES.PARTICULAR,ROLES.ADMIN)
// ,passport.authenticate('jwt', { session: false }),inRole(ROLES.PARTICULAR,ROLES.ADMIN)
// ,passport.authenticate('jwt', { session: false }),inRole(ROLES.PARTICULAR,ROLES.ADMIN)
// ,passport.authenticate('jwt', { session: false }),inRole(ROLES.PARTICULAR,ROLES.ADMIN)
module.exports = router;
