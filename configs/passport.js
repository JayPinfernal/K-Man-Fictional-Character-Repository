const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require ('mongoose');
const impkeys = require('./impkeys');

//Load User Model
const User = mongoose.model('users');

module.exports = function(passport) {
 passport.use(new GoogleStrategy({
   clientID: impkeys.googleClientID,
    clientSecret: impkeys.googleClientSecret,
    callbackURL: "/gauth/google/callback",
    proxy : true
 }, (accessToken, refreshToken, profile, done) => {
     //console.log(profile);

     const img= profile.photos[0].value.substring(0,profile.photos[0].value.indexOf('?'));

     const newUser = {
       googleID : profile.id,
       firstName : profile.name.givenName,
       lastName : profile.name.familyName,
       email: profile.emails[0].value,
       image :img
     }

     //check for existing user (prevents repitition)
     User.findOne({
       googleID : profile.id
     }).then( user =>
       {
         if(user){
           done(null,user);
         }
         else{
           new User(newUser).save()
            .then(user => done(null,user))
         }
       }

     )
     .catch(err => {console.log(err);})
 })
 )
 passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then (user =>
    done(null, user)
  );
});
};
