
const bcrypt = require('bcryptjs');

const User = require('../models/User');   
const passport = require('passport');

const ensureAuthenticated = require('../config/auth');
const Post = require('../models/Posts');


async function handleLocalSignup(req, res) {
    const { firstName, lastName, email, password, password2 } = req.body;
    const errors = [];

    // Validation checks
    if (!firstName || !lastName || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // If there are validation errors, render the signup form with errors
    if (errors.length > 0) {
        console.log('Error:', errors);
        return res.render('signup', {
            errors,
            firstName,
            lastName,
            email,
            password,
            password2,
        });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            errors.push({ msg: 'User already exists' });
            req.flash('error_msg', { message: 'User already exists' });
            return res.render('signup', {
                errors,
                firstName,
                lastName,
                email,
                password,
                password2,
            });
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        req.flash('success_msg', { message: 'You are now registered and can log in' });
        console.log(newUser);
        res.redirect('/auths/login');

    } catch (err) {
        console.error(err);
        req.flash('error_msg', { message: 'Registration failed' });
        res.status(500).json({ error: 'An error occurred during registration' });
    }
}
const signupWithGoogle = (req, res, next) => {
    passport.authenticate(
        'google-signup', {
            successRedirect: '/auths/login',
            failureRedirect: '/auths/signup',
            failureFlash: true,
        }
    )
    (req, res, next)
}
const loginWithGoogle = (req, res, next) => {
    passport.authenticate(
    'google-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/auths/login',
        failureFlash: true,
    })
    (req, res, next)
    }
const loginLocally = (req, res, next) => {
    passport.authenticate('local',  (err, user, info) => {
        if (err) throw err;
        if (!user) {
            req.flash('error_msg', info.message);
            return res.render('login', { email: req.body.email , password: req.body.password});
        }
        req.login(user, async (err) => {
            if (err) throw err;
           const allPosts = await Post.find();
            console.log(allPosts);
    
            if (allPosts.length === 0) {
                console.log('No posts found');
            }
            req.flash('success_msg', 'You are now logged in');
            return res.render('dashboard', { allPosts , user: req.user });
    
    
        });
    })(req, res, next);
}
const logOut = [
    ensureAuthenticated, (req, res) => {
    
        req.logout(err => {
            if (err) { return next(err); }

            req.flash('success-msg', { message: 'You are now logged out' });
            res.redirect('/home');
        });
    }
]   
module.exports = { handleLocalSignup, signupWithGoogle, loginWithGoogle , loginLocally, logOut}
