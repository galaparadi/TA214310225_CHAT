var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"]
  }
});
const axios = require('axios');

let port = process.env.PORT || 8080;

io.of(/^\/[\w-]+$/).on('connection', socket => {
  let { username, workspace } = socket.handshake.query;

  socket.on('ask-private-chat', (msg) => {
    socket.broadcast.emit('someone-ask-private-chat', msg);
  });
  socket.on('receive-private-chat', msg => {
    msg.destId = socket.id;
    socket.broadcast.emit('receive-private-chat', msg);
  });
  socket.on('private-chat', (data, room) => {
    axios.post('http://localhost:4000/chats', {
      partisant: [username, data.receiver],
      workspace: workspace,
      chat: {
        message: data.message,
        sender: username
      }
    })
    .then(response => {
      socket.to(room).emit('private-chat', data.message, username);
    })
    .catch(error => {
      console.log(error);
    });

    
  })
});

http.listen(port, function () {
  console.log('listening on * : ' + port)
});
