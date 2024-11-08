const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    petOwnName: { type: String },
    petName: { type: String },
    type: { type: String },
    petAge: { type: Number },
    petGender: { type: String },
    petDescription: { type: String },
    petImage: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
