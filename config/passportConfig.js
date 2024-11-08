const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function(passport) {
    // Local Strategy for authentication
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
        },
        (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect email.' });
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect password.' });
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    return done(err);
                });
        }
    ));

    passport.use('google-signup', new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.CALLBACKURL_SIGNUP,
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            if (!profile || !profile.id) {
                return done(new Error('Google profile information is missing or incomplete.'));
            }
            console.log('Full profile received from Google:', profile);

    
            try {
                const existingUser = await User.findOne({ googleId: profile.id });
                if (existingUser) {
                    return done(null, false, { message: 'The email is already registered.' });
                }
                const nameParts = profile.displayName.split(' ');
                const firstName = nameParts[0];
                const lastName = nameParts.slice(1).join(' ');
                const newUser = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                });
                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                console.error('Error:', error);
                return done(error);
            }
        }
    ));

    passport.use('google-login', new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.CALLBACKURL_LOGIN,
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            if (!profile || !profile.id) {
                return done(new Error('Google profile information is missing or incomplete.'));
            }
            console.log('Full profile received from Google:', profile);

    
            const email = profile.emails[0].value;
            const googleId = profile.id;
            try {
                const user = await User.findOne({ email: email });
                if (user) {
                    if (user.googleId) {
                        return done(null, user);
                    } else {
                        user.googleId = googleId;
                        await user.save();
                        return done(null, user);
                    }
                } else {
                    return done(null, false, { message: 'That email is not registered.' });
                }
            } catch (err) {
                console.log(err);
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            console.error(error);
            done(error);
        }
    });
};