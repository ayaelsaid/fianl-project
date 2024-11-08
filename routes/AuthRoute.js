const express = require('express');
const router = express.Router();
const { handleLocalSignup, signupWithGoogle, loginWithGoogle, loginLocally, logOut }  = require('../controllers/AuthAppControllers');
const passport = require('passport');
// sign up page
router.get('/signup', function(req, res) {
    res.render('signup');
})
// sign up locally
router.post('/signup', handleLocalSignup);

// sign up with Google
router.get('/auth/google/signup', passport.authenticate('google-signup', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback/signup', signupWithGoogle);


// grt log in page
  
router.get('/login', (req, res) => {
    res.render('login' );
});

// log in locally
router.post('/login',  loginLocally)

// log in with Google
router.get('/auth/google/login', passport.authenticate('google-login', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback/login', loginWithGoogle);


// log out
router.get('/logout', logOut)


module.exports = router;