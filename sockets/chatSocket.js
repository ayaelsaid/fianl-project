

const Room = require('../models/Rooms')
const Message = require('../models/Messages')
const User = require('../models/User')
const { Server } = require('socket.io');
const users = [];

// Helper functions
function addUser(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

function removeUser(id) {
    const index = users.findIndex(user => user.id === id);
    return index !== -1 ? users.splice(index, 1)[0] : null;
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

const chatSockets = (server) => {
    const io = new Server(server);
    // const users = {};
    const rooms = {}; 
    io.on('connection', (socket) => {
        console.log('A user connected');
    
        socket.on('joinRoom',  ({ username, room }) => {
            const user = addUser(socket.id, username, room);
            socket.join(user.room);

            socket.emit('message', { 
                username: 'System', 
                text: 'Welcome to the chat room!',
                isSystemMessage: true,
                timestamp: Date.now()
            });
        
            socket.to(user.room).emit('message', {
                username: 'System',
                text: `${user.username} has joined the chat`,
                isSystemMessage: true,
                timestamp: Date.now()
            });
        
    
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room),
            });
            
            socket.on('chatMessage', async (msg) => {
                try {
                    const messageObj = { username: user.username, text: msg, timestamp: Date.now() };
                    
                    io.to(user.room).emit('message', messageObj);
                    
                    let roomDoc = await Room.findOne({ roomName: user.room });
                    if (!roomDoc) {
                        return console.error('Room not found');
                    }
          

                    let messageDoc = await Message.findOne({ roomId: roomDoc._id });
                    if (!messageDoc) {
                        messageDoc = await Message.create({
                            roomId: roomDoc._id,
                            messages: [{
                                text: msg, 
                                sender: user.username,
                                timestamp: Date.now(),
                            }]
                        });
                    } else {
                        // Add the new message to the existing messages array
                        messageDoc.messages.push({
                            text: msg,
                            sender: user.username,
                            timestamp: Date.now(),
                        });
                        await messageDoc.save(); // Save the updated document
                    }
                } catch (error) {
                    console.error('Error handling chat message:', error);
                }
            });
                        
                        // Handle user disconnect
            socket.on('disconnect', () => {
                const user = removeUser(socket.id);
                if (user) {
                    io.to(user.room).emit('message', `${user.username} has left the chat`);
                    io.to(user.room).emit('roomUsers', {
                        room: user.room,
                        users: getRoomUsers(user.room),
                    });
                }
            });
        });
    });
    
}
module.exports = chatSockets;

