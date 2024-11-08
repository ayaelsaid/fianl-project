const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId : { type: String,     sparse: true},
    // role: { type: String, enum: ['admin', 'user'], default: 'user' },
    
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    messagesId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    postId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
})

const User = mongoose.model('User', UserSchema)

module.exports = User;