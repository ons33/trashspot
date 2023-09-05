const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../security/passport");
const CLIENT_URL = "https://the-bosses-pi-dev-h2f8.vercel.app/logged";

router.get("/login/success", (req, res) => {
  // console.log("req.user", req.user)
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
  
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
//router.get("'/google'", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  "/google/callback",
 
    passport.authenticate("google", {
      
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
   
    })
  
 
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
