const express = require('express');
const router = express.Router();
const { getRoomsPage,
JoinChatRoom } = require('../controllers/chatAppController');

// rooms page
router.get('/chatroom', getRoomsPage);
// chat room
router.post('/join', JoinChatRoom);





module.exports = router;