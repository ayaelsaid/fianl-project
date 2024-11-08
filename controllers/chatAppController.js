const User = require('../models/User');
const Profile = require('../models/Profile');
const ensureAuthenticated = require('../config/auth');
const Message = require('../models/Messages');
const Room = require('../models/Rooms');

const getRoomsPage =[ ensureAuthenticated, async (req, res) => {
    if (!req.user) {
        console.error('User is not authenticated or logged out.');
        return res.status(401).send('User not authenticated');
    }

    try {
        
        // Render the chat page
       return res.render('chat', { user: req.user});

    } catch (error) {
        console.error('Error in chatroom route:', error);
        res.status(500).send('Server error');
    }
}
]
const JoinChatRoom = async (req, res) => {
    const { username, room } = req.body;
    const user = req.user;
    console.log(`username: ${username}`);

    if (!user) {
        return res.status(401).send('User not authenticated');
    }

    try {
        let profile = await Profile.findOne({ userId: user._id });
        if (!profile) {
            profile = await Profile.create({ userId: user._id });
        }

        let roomDoc = await Room.findOne({ roomName: room });
        if (!roomDoc) {
            roomDoc = await Room.create({ roomName: room, userId: user._id, projectId: profile._id });
        }

        if (!user.roomId) {
            user.roomId = roomDoc._id;
            user.username = username;
            await user.save();
        }

        let messages = await Message.findOne({ roomId: roomDoc._id });
        if (!messages) {
            messages = await Message.create({
                roomId: roomDoc._id,
                userId: user._id,
                messages: [{ sender: user.userName, text: '', timestamp: new Date() }]
            });
            await messages.save();
        }
        if (!messages.userId){
            messages.userId = user._id;
            await messages.save();
        }

        return res.render('chatting', { room: roomDoc, messages: messages ? messages.messages : [], user , username });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
}

module.exports = {
    getRoomsPage,
    JoinChatRoom
};