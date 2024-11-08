const express = require('express');
const router = express.Router();
const {
    handleUploadCoverImage,
    handleUploadProfileImage,
    handleUploadingMoreImages,
    handleDeleteCoverImage,
    handleDeleteProfileImage
    } = require('../controllers/ProfileAppControllers/imageController');
const { 
    getProfile, updateProfile, ChangePassword , deleteProfile

} = require('../controllers/ProfileAppControllers/handleProfileController');
const { addBio, removeBio, addDetails } = require('../controllers/ProfileAppControllers/bioController');
const  getUserProfile  = require('../controllers/ProfileAppControllers/getUserProfileController');
// User profile route
router.get('/profile', getProfile);
router.post('/profile/update', updateProfile)
router.post('/profile/changepassword', ChangePassword);
router.post('/profile/delete', deleteProfile)


// Update Bio && details
router.post('/profile/bio', addBio);
router.post('/profile/remove-bio', removeBio)
router.post('/profile/addDetails', addDetails);



// Upload Images
router.post('/profile/uploadImagePage',  handleUploadingMoreImages);
router.post('/profile/uploadProfileImage', handleUploadProfileImage);
router.post('/profile/uploadCoverImage', handleUploadCoverImage);


// delete the imges
router.post('/profile/deleteProfileImage', handleDeleteProfileImage);
router.post('/profile/deleteCovreImage', handleDeleteCoverImage);
// get users profile
router.get('/profile/:id', getUserProfile)

module.exports = router;

