const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imagePath: String,
    imageDate: Date,
});

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String },
    name: { type: String },
    gender: { type: String },
    phone: [String],
    relationship: { type: String },
    images: {
        profileImages: [ImageSchema],
        coverPhotos: [ImageSchema],
        otherImages: [ImageSchema]
    },
    profileImage: { type: String },
    coverPhoto: { type: String },
    jobTitle: [String],
    company: [String],
    education: [String],
    age: { type: Number },
    location: { type: String },
    languages: [String],
    interests: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
