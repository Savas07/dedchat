const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require(path.join(__dirname, 'PUBLIC/js/messages'));
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require(path.join(__dirname, 'PUBLIC/js/users'));


const server = http.createServer(app);
const io = socketio(server);

var botName = "Sistem";
// set static folder
app.use(express.static(path.join(__dirname, 'PUBLIC')));

//run
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);


        socket.emit('message', formatMessage(botName, 'welcome to dedchat'));

        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} sohbete katıldı`));


        // send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });


    //listen for message
    socket.on('chatMessage', msg => {

        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} sohbeti terk etti`));
        };

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
