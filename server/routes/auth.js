const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
//we got thes from passpott /nodejs
passport.use(new GoogleStrategy({
    //change those vars from google 
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
async function(accessToken, refreshToken, profile, done) {
   //fitching from google auth account
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileImage: profile.photos[0].value
        } 

        try{
//look for users
            let user = await User.findOne( { googleId: profile.id } )
            
            if(user){
                done(null, user);

            }else{
                user = await User.create(newUser);
                done(null, user);
            }
        }catch(error){
            console.log(error);
        }
  }
));


//google login route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

//revieving data
router.get('/google/callback', passport.authenticate('google', { 
    failureRedirect: '/',
    successRedirect: '/dashboard' 
})

  );

  //Route if somthing went rong 
router.get('/login-failure', (req, res)=>{
    res.send('Somthing went wrong...')
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
      if(error) {
        console.log(error);
        res.send('Error loggin out');
      } else {
        res.redirect('/')
      }
    })
});

// Presist user data after successful authentification
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
//Retrieve user data from session
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
});

module.exports = router;