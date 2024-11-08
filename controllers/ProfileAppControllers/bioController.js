const User = require('../../models/User');
const Profile = require('../../models/Profile');
const ensureAuthenticated = require('../../config/auth');


const addBio = [
    async (req, res) => {
        const user = req.user;
        const { bio } = req.body;
      
        console.log(bio);

        try {
            const profile = await Profile.findOneAndUpdate(
                { userId: user._id },
                { bio },
                { new: true }
            );
           return res.render('profile', { user, profile });
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'An error occurred while updating the profile bio');
          return  res.redirect('/users/profile');
        }
    }
]
const removeBio = [async (req, res) => {
    const user = req.user;
    if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/dashboard');
    }
    try {
        const profile = await Profile.findOne({ userId: user._id });
        if (profile) {
        profile.bio = "";
            await profile.save();
            req.flash('success_msg', 'Bio removed successfully.');
            return res.redirect('/users/profile');
    }
    } catch (e) {
        console.error(e);
        req.flash('error_msg', 'An error occurred while removing the profile bio.');
        return res.redirect('/users/profile');
    }
}
]

const addDetails = [
    ensureAuthenticated, async (req, res) => {
        const user = req.user;
        try {
            const profile = await Profile.findOne({ userId: user._id });
            if (profile) {
                const { gender, jobTitle, company, education, age, location, languages, interests, phone, relationship } = req.body;
    
                // Direct assignment for scalar fields
                Object.assign(profile, { relationship, gender, age, location });
    
                const addToArrayField = (field, items) => {
                    if (items) {
                        profile[field] = profile[field].concat(
                            items.split(/[, ]+/)
                                .map(item => item.trim())
                                .filter(item => item && !profile[field].includes(item))
                        );
                    }
                };
                
                addToArrayField('jobTitle', jobTitle);
                addToArrayField('company', company);
                addToArrayField('education', education);
                addToArrayField('languages', languages);
                addToArrayField('interests', interests);
                addToArrayField('phone', phone);
    
    
                await profile.save();
                req.flash('success_msg', 'Profile details updated successfully');
                return res.redirect('/users/profile');
            }
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'An error occurred while updating the profile details');
            res.redirect('/users/profile');
        }
    }
]
module.exports = {
    addBio,
    removeBio,
    addDetails
}