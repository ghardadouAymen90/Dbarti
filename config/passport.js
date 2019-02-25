const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
//options (opts) is an object literal containing options to control how the token is extracted from the request or verified.
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//fromAuthHeaderAsBearerToken() creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
opts.secretOrKey = keys.secretOrKey;
//SecretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for
//verifying the token's signature. REQUIRED unless secretOrKeyProvider is provided.

//Configure Strategy : JWT authentication strategy
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if ("user ",user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
