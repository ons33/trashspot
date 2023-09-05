const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const UserModel = require("../models/users.models");
const jwt = require('jsonwebtoken')
const GOOGLE_CLIENT_ID =
  '385363050778-p5uriguv5ovdl0t8ephutnod4losdrq1.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PRIVATE_KEY;

FACEBOOK_APP_ID = "2483293181809291";//"4338773492806334"//
FACEBOOK_APP_SECRET = "43c03cf2d9e62dbb3ca52d531fd8328e";//"19c25cda602ef306bb5031950b360de7"//

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      
      UserModel.findOne({ email: profile.emails[0].value })
        .then(async function (user) {
          if (user) {
            const updatedUser = {
      
              image: { url: profile.photos[0].value },
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              googleId:profile.id,
              secret: accessToken,
            };
            const result = await UserModel.findOneAndUpdate(
              { _id: user.id },
              { $set: updatedUser },
              { new: true }
            );
            // console.log(cb(null, result))
            return cb(null, result);
          } else {
            const newUser = new UserModel({
              googleId: profile.id,
              image: { url: profile.photos[0].value },
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              secret: accessToken,
              role:"PARTICULAR"
            });
            const result = await newUser.save();
            return cb(null, result);
          }
        })
        .catch(function (err) {
          return cb(err);
        });
    }
    
  )
);


// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback',
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//       console.log('esm: ' + profile.name.givenName);
//       console.log('la9ab: ' + profile.name.familyName);
//       console.log('taswira: ' + profile.photos[0].value);
//       console.log('email' + profile);
//       new UserModel({
//         firstName: profile.name.givenName,
//         lastName: profile.name.familyName,
//         image: { url: profile.photos[0].value },
//         email: profile.emails[0].value,
//       })
//         .save()
//         .then((newUser) => {
//           console.log('new user added');
//         });
//     }
//   )
// );
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "name",
        "picture.type(large)",
        "emails",
      ],

    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile.displayName);
     //const email = profile.emails[0].value;
     console.log("heye",profile)
    const image = profile._json.picture.data.url;
    const firstName = profile._json.first_name;
    const lastName = profile._json.last_name;
    console.log("bio: " + profile.emails[0].value);
    cb(null, profile);
    console.log("fb" + Object.entries(profile));

      console.log(JSON.stringify(profile))
      UserModel.findOne({ email: profile.emails[0].value })
      .then(async function (user) {
        if (user) {
          const updatedUser = {
    
            image: { url: profile.photos[0].value },
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            googleId:profile.id,
            secret: accessToken,
          };
          const result = await UserModel.findOneAndUpdate(
            { _id: user.id },
            { $set: updatedUser },
            { new: true }
          );
          return cb(null, result);
        } else {
          const newUser = new UserModel({
            googleId: profile.id,
            image: { url: profile.photos[0].value },
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            secret: accessToken,
            role:"PARTICULAR"
          });
          const result = await newUser.save();
          return cb(null, result);
        }
      })
      .catch(function (err) {
        return cb(err);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// passport.use(
//   new FacebookStrategy(
//     {
//       // pull in our app id and secret from our auth.js file
//       clientID: '2483293181809291', //"890857544821874",//"2903111913343913",
//       clientSecret: '43c03cf2d9e62dbb3ca52d531fd8328e', //"59eaf60604d96afcae1fa1fd9235e252",//"1a20f50e3f7172b78f81b8a9cf3ecd21",
//       callbackURL: 'https://he-bosses-pi-dev-api.onrender.com/auth/facebook/callback',
//       profileFields: [
//         'id',
//         'displayName',
//         'name',
//         'picture.type(large)',
//         'email',
//       ],
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//       console.log('fb' + Object.entries(profile));
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      UserModel.findOne({ _id: jwt_payload.id }).then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
