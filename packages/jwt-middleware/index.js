const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

exports.setup = function(publicKey) {
    passport.use(
        new JWTstrategy(
            {
                secretOrKey: publicKey,
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
            },
            async (token, done) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
}
