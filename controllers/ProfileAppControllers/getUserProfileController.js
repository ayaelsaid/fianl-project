const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Room = require('../../models/Rooms');
const ensureAuthenticated = require('../../config/auth');

const getUserProfile = [
    ensureAuthenticated,
    async (req, res) => {
        const id = req.params.id;
        const user = req.user;
        
        try {
            if (user._id.equals(id)) {
                let  profile = await Profile.findOne({ userId: user._id });
                
                if (!profile) {
                    return res.status(404).json({ message: 'Profile not found' });
                }

                return res.render('userprofile', { user, profile });


            }
            else {
            const userLink = await User.findById(id);
            if (userLink) {

                const  profile = await Profile.findOne({ userId: userLink._id });
                
                if (!profile) {
                    return res.status(404).json({ message: 'Profile not found' });
                }

                return res.render('userprofile', { user, profile });
            } else {
                return res.status(403).json({ message: 'Forbidden: You cannot view this profile' });
            }
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
];

module.exports = getUserProfile;
