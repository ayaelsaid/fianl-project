const User = require('../../models/User');
const Profile = require('../../models/Profile');
const upload = require('../../config/multerConfig');
const ensureAuthenticated = require('../../config/auth');

// handling uploadong all photos on profile page
const handleUploadProfileImage = [
    ensureAuthenticated,
    upload.single('profileImage'),
    async (req, res) => {
        const user = req.user;
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        try {
            const profile = await Profile.findOne({ userId: user._id });

            // Create profile if not found
            // if (!profile) {
            //     profile = await Profile.create({
            //         userId: user._id,
            //         bio: '',
            //         name: `${user.firstName} ${user.lastName}`,
            //         gender: '',
            //         phone: [],
            //         relationship: '',
            //         images: {
            //             profileImages: [],
            //             coverPhotos: [],
            //             otherImages: []
            //         },
            //         profileImage: '', 
            //         coverPhoto: '',
            //         jobTitle: [],
            //         company: [],
            //         education: [],
            //         age: '',
            //         location: '',
            //         languages: [],
            //         interests: [],
            //         createdAt: new Date(),
            //         updatedAt: new Date()
    
            //     });
            // }

            // Ensure images array exist
            if (!profile.images) profile.images = { profileImages: [], coverPhotos: [], otherImages: [] };

            // Process uploaded file
            const imageName = req.file.filename;
            const profileImagePath = `/UploadedImages/${imageName}`;
            const imageDate = new Date();

            profile.profileImage = profileImagePath;

            // Check for duplicates
            const existingImage = profile.images.profileImages.find(item => item.imagePath === profileImagePath);
            if (existingImage) {
                existingImage.imageDate = imageDate;
            } else {
                profile.images.profileImages.push({ imagePath: profileImagePath, imageDate });
            }

            await profile.save();
            return res.redirect('/users/profile')

        } catch (err) {
            console.error(err);
            res.redirect('/users/profile');
        }
    }
];

const handleUploadCoverImage = [
    ensureAuthenticated,
    upload.single('coverPhoto'),
    async (req, res) => {
        const user = req.user;
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        try {
            const profile = await Profile.findOne({ userId: user._id });
            if (!profile) {
                return res.status(400).json({ error: 'Profile not found' });
            }

            // Initialize profile image arrays if they don't exist
            if (!profile.images.profileImages) profile.images.profileImages = [];
            if (!profile.images.coverPhotos) profile.images.coverPhotos = [];
            if (!profile.images.otherImages) profile.images.otherImages = [];

            const imageName = req.file.filename;
            console.log(`Image ${imageName}`);
            const profileImagePath = `/UploadedImages/${imageName}`;
            const imageDate = new Date();
            profile.coverPhoto = profileImagePath;

            const imageUnique = new Set();

            if (!imageUnique.has(profileImagePath)) {
                imageUnique.add(profileImagePath);
                profile.images.coverPhotos.push({ imagePath: profileImagePath, imageDate });
            } else {
                const existingImage = profile.images.coverPhotos.find(item => item.imagePath === profileImagePath);
                if (existingImage) {
                    existingImage.imageDate = imageDate;
                }
            }

            await profile.save();
            return res.render('profile', { profile, user });

        } catch (err) {
            console.error(err);
            res.redirect('/users/profile');
        }
    }
];


const handleUploadingMoreImages = [
    ensureAuthenticated, upload.array('images', 10), async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const profile = await Profile.findOne({ userId: user._id });
        

        // Initialize otherImages array if it doesn't exist
        if (!profile.images.otherImages) {
            profile.images.otherImages = [];
        }

        const imagePaths = req.files.map(file => `/UploadedImages/${file.filename}`);
        const currentDate = new Date();
const imageUnique = new Set();
        // Add each image to the appropriate array in the profile
        imagePaths.forEach(path => {
                profile.images.otherImages.push({ imagePath: path, imageDate: currentDate });

        });
        await profile.save();
        return res.render('profile', { profile, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while uploading images' });
    }
}
]


// handling delete  photos on profile page
const handleDeleteProfileImage = [
    ensureAuthenticated,
    async (req, res) => {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        try {
            const profile = await Profile.findOne({ userId: user._id });
            if (!profile) {
                return res.status(404).json({ error: 'Profile not found' });
            }

            if (profile.profileImage) {
                // Update profile to remove the profile image
                profile.profileImage = "";
                await profile.save();

                req.flash('success_msg', 'Profile image deleted successfully');
                return res.render('profile', { profile, user });
            } else {
                return res.status(404).json({ error: 'No profile image to delete' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while deleting the profile image.' });
        }
    }
];

const handleDeleteCoverImage = [ensureAuthenticated, 
    async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const profile = await Profile.findOne({ userId: user._id });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        if (profile.coverPhoto) {

            // Update profile to remove the profile image
            profile.coverPhoto = "";
            await profile.save();

            req.flash('success_msg', 'Profile image deleted successfully');
          return  res.render('profile', { profile, user });
        } else {
            return res.status(404).json({ error: 'No profile image to delete' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the profile image.' });
    }
}
]

module.exports = {
    handleUploadCoverImage,
    handleUploadProfileImage,
    handleUploadingMoreImages,
    handleDeleteCoverImage,
    handleDeleteProfileImage
};
