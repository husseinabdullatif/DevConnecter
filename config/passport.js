const jwtSrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const jwtKey = require('./keys').jwtKey;
const User = mongoose.model('users');

const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtKey
};

module.exports = (passport) => {
    passport.use(
        new jwtSrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    console.log(err)
                })
        })
    )
};

