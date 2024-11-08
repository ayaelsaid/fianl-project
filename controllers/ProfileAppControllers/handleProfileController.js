const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Rooms = require('../../models/Rooms');
const Posts = require('../../models/Posts');
const Requests = require('../../models/Requests');
const Messages = require('../../models/Messages');
const ensureAuthenticated = require('../../config/auth');
const bcrypt = require('bcryptjs');



const getProfile = [
    ensureAuthenticated, 
    async (req, res) => {
        const user = req.user;
        try {
            // Find or create profile
            let profile = await Profile.findOne({ userId: user._id });
            
            if (!profile) {
                console.log(`Creating profile for user ID: ${user._id}`);
                profile = await Profile.create({
                    userId: user._id,
                    bio: '',
                    name: `${user.firstName} ${user.lastName}`,
                    gender: '',
                    phone: [],
                    relationship: '',
                    images: {},
                    profileImage: '',
                    coverPhoto: '',
                    jobTitle: [],
                    company: [],
                    education: [],
                    age: '',
                    location: '',
                    languages: [],
                    interests: [],
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            } 
if(!user.profileId){
    user.profileId = profile._id;
    await user.save();
}
res.render('profile', { user, profile });
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Profile found for user ID: 672d6f375c689dae29297353An error occurred while retrieving the profile');
            res.redirect('/dashboard');
        }
    }
];


const updateProfile = [
    ensureAuthenticated, async (req, res) => {
    const user = req.user
    if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/dashboard');
    }
    const { firstName, lastName, email } = req.body;

    try {
       const updatedUser =  await User.findByIdAndUpdate(
            user._id,
            { firstName, lastName, email },
            { new: true, runValidators: true }
        );

        const profile = await Profile.findOne({ userId: user._id });
        profile.name = `${updatedUser.firstName} ${updatedUser.lastName}`;
        await profile.save();
        req.flash('success_msg', 'Profile updated successfully');
        return res.render('profile', { profile, user : updatedUser}); 
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred while updating the profile');
        res.redirect('/users/profile');
    }
}]

const ChangePassword = [
    ensureAuthenticated, async (req, res) => {
        const userId = req.user._id;
        const { currentPassword, password, password2 } = req.body;
        console.log(currentPassword , password, password2)
        if (password !== password2) {
            req.flash('error_msg', 'Passwords do not match');
            return res.redirect('/users/profile');
        }

    
        try {
            const user = await User.findById(userId);
            const profile = await Profile.findOne({ userId: user._id });
            if (user.password) {
                // Check if the current password matches the stored password
                const match = await bcrypt.compare(currentPassword, user.password);
                if (!match) {
                    req.flash('error_msg', 'Incorrect current password');
                    return res.redirect('/users/profile');
                }
                // Hash the new password
                const changedPassword = await bcrypt.hash(password, 10); 
                user.password = changedPassword;
            
            } else {
                // If there is no password, just hash the new password
                const newPassword = await bcrypt.hash(password, 10); 
                user.password = newPassword;
                console.log(user.password);
            }
            
    await user.save();
            req.flash('success_msg', 'Password updated successfully');
            return res.render('profile', { user, profile });
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'An error occurred while updating the password');
            return res.redirect('/users/profile');
        }
    }
    
]
const deleteProfile = [ensureAuthenticated, async (req, res) => {
    const user = req.user;
    try {
        // Delete user and profile
        const promises = [
            User.findOneAndDelete({ _id: user._id }),
            Profile.findOneAndDelete({ userId: user._id }),
            Posts.findOneAndDelete({ userId: user._id }),
            Requests.findOneAndDelete({ userId: user._id }),
            Messages.findOneAndDelete({ userId: user._id }),
            Rooms.findOneAndDelete({ userId: user._id }),



        ]
        const [deletedUser, deletedProfile, deletedPosts, deletedRequests, deletedMessages, deletedRooms] = await Promise.all(promises);
        console.log(deletedProfile);
        console.log(deletedUser);
        console.log(deletedPosts);

        console.log(deletedRequests);
        console.log(deletedMessages);
        console.log(deletedRooms);


        if (deletedUser&& deletedProfile) { 
            req.flash('success_msg', 'User deleted successfully');
            req.logout(err => { 
                if (err) {
                    console.error('Logout error:', err);
                }
                res.redirect('/auths/signup');
            });
        } else {
            req.flash('error_msg', 'User or profile not found');
            res.redirect('/dashboard');
        }
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred while deleting the user');
        return res.redirect('/dashboard');
    }
}
]
module.exports = {
    getProfile,
    updateProfile,
    ChangePassword,
    deleteProfile
}