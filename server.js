var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http,{
  cors:{
    origin: "http://localhost",
    methods: ["GET","POST"]
  }
});

let port = process.env.PORT || 8080;

io.of(/^\/[\w-]+$/).on('connection', socket => {
  let {userId, workspace} = socket.handshake.query;
  const namespace = socket.nsp;
  socket.on('sending-dochub',(msg) => {
    console.log(Object.keys(io.sockets.server.engine.clients));
    socket.broadcast.emit('sending-dochub', msg);
  });
  socket.on('ask-all-user-client-id', msg => {
    socket.broadcast.emit('send-socket-id');
  })
  socket.on('ask-private-chat', (msg) => {
    socket.broadcast.emit('someone-ask-private-chat', msg);
  });
  socket.on('receive-private-chat', msg => {
    msg.destId = socket.id;
    socket.broadcast.emit('receive-private-chat',msg);
  });
  socket.on('join:private',room => {
    socket.join(room);
  })
  socket.on('private-chat',(msg,room)=>{
    socket.to(room).emit('private-chat', msg);
  })
});

http.listen(port, function () {
  console.log('listening on * : ' + port)
});
