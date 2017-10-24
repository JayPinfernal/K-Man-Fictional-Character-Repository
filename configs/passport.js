const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require ('mongoose');
const impkeys = require('./impkeys');

module.exports = function(passport) {
 passport.use(new GoogleStrategy({
   clientID: impkeys.googleClientID,
    clientSecret: impkeys.googleClientSecret,
    callbackURL: "/gauth/google/callback",
    proxy : true
 }, (accessToken, refreshToken, profile, done) => {
     console.log(profile);
 })
 )
};
