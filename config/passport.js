
//Using passport-jwt for authenticating with a JSON web token

const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./database'); // requiring the secret token made in database.js file
const User = require('../models/user');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

module.exports = function (passport) {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findUserById({_id: jwt_payload._doc._id}, function(err, user) {  // checks whether is there a such user with the use of this mongoose method
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
};