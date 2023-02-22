const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('./models/user');

const setupPassport = function() {
    passport.use(
        'signup',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                try {
                    const name = req.body.name;

                    const user = new UserModel({ email, password, name });
                    await user.save();
    
                    return done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use(
        'login',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    const user = await UserModel.findOne({ email });
    
                    if (!user) return done(null, false, { message: 'User not found' });
    
                    const validate = await user.isValidPassword(password);
    
                    if (!validate) return done(null, false, { message: 'Wrong Password' });
    
                    return done(null, user, { message: 'Logged in Successfully' });
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
}

module.exports = {
    setupPassport,
}
