const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../config/auth');
const User = require('../models/User');
const Post = require('../models/Posts');
const upload = require('../config/multerConfig');
const Request = require('../models/Requests');
const mongoose = require('mongoose');
// const { previousTuesdayWithOptions } = require('date-fns/fp');
const getRequesFormPage = [ensureAuthenticated, async function (req, res) {
    try {
        const user = await User.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        res.render('requestForm');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}]
const postRequestBreeding = [ensureAuthenticated, upload.single('petImage'), async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        
        const { petAge, petDescription, petGender, petName, type } = req.body;
        let animalImagePath = '';

        if (req.file) {
            animalImagePath = `/UploadedImages/${req.file.filename}`;
        }

        if (petAge && petGender && petName && type && petDescription) {
            const newPost = new Post({
                userId: user._id,
                petOwnName: `${user.firstName} ${user.lastName}`,
                petName,
                petAge,
                petGender,
                type,
                petDescription,
                petImage: animalImagePath
            });
            
            await newPost.save();
            user.postId = newPost._id;
            await user.save();
            return res.redirect('/dashboard');
        } else {
            return res.status(400).json({ msg: 'All fields are required' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}]
const makeMatches = [ensureAuthenticated, async function (req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        const {  postId, animalName, animalType, animalAge, phone, petDescriptionRequest
        } = req.body;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ msg: 'Invalid post ID format' });
        }

        // Convert postId to ObjectId
        const postObjectId = new mongoose.Types.ObjectId(postId);




        const post = await Post.findOne({ _id: postObjectId});
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        const user = await User.findOne({ postId: post._id });
        const request = await Request.create({
            userId: user._id,
            postId: post._id,
            animalName,
            animalType,
            animalAge,
            phone,
            petDescriptionRequest
     });
     await request.save(); 
    return res.redirect('/dashboard');

    }catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}]

const getMatchesOffers = [
    ensureAuthenticated, async function (req, res) {
        const user = req.user
        try {
        if (!user){
            return res.status(401).json({ msg: 'Unauthorized' });
        }
    const numPosts = await Post.countDocuments({ userId: user._id });
    
    const posts = await Post.find({userId : user._id}).sort({ createdAt: -1 });;
    
            const eachPostWithRequests = await Promise.all(
                posts.map(async (post) => {
                    const requests = await Request.find({ postId: post._id }).sort({ createdAt: -1 });
                    const numRequests = await Request.countDocuments({ postId: post._id });
    
                    return { post, requests , numRequests };
                })
            );
    
            return res.render('requestPage', { eachPostWithRequests, user, numPosts });
    
    }
        catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
]
module.exports = {
    getRequesFormPage,
    postRequestBreeding,
    makeMatches,
    getMatchesOffers,
    
}