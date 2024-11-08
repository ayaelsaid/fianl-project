const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../config/auth');
const User = require('../models/User');
const Post = require('../models/Posts');

router.get('/', (req, res) => {
    res.render('welcome');
});
router.get('/home', (req, res) => {
    res.render('home');

});
router.get('/dashboard', ensureAuthenticated, async function (req, res) {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        const allPosts = await Post.find().populate('userId', 'firstName lastName profileId').sort({ createdAt: -1 });
        console.log(allPosts);

        if (allPosts.length === 0) {
            console.log('No posts found');
        }
        return res.render('dashboard', { allPosts , user });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
