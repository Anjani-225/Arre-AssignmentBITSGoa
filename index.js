const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//API to create a message in the group (post a message in the group chat)
app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
   
    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(3000, function() {
    console.log('listening on *:3000');
});