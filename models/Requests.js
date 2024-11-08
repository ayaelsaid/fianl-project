// const { previousTuesdayWithOptions } = require('date-fns/fp');
const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    animalName: { type: String },
    animalType: { type: String },
    animalAge: { type: Number },
    phone: { type: String },
    petDescriptionRequest: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
