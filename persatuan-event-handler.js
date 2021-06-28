module.exports = (io) => {
    const connectStatus = function(){
      
    };

    const joinRoom = function () {
      const socket = this;
      socket.join('perundingan');
    };
  
    const perundinganSend = function (msg) {
      const socket = this;
      socket.to('perundingan').broadcast.emit('perundingan:rec',msg);
    };

    const chatMessage = function(msg,senderId) {
      const socket = this;
      const workspace = socket.nsp;
      const {userId} = socket.handshake.query;
      workspace.emit('chat message', msg,senderId);
    }
  
    const pingToAll = function(msg) {
        const socket = this;
        socket.broadcast.emit("pingu", "PINGG!!! persatuan")
    }

    const disconnecting = function(reason){
      const socket = this;
      socket.broadcast.emit('system status', `${this.id} disconnected`);
    };

	const showOnline = function(data) {
		const socket = this;
	};

    return {
      joinRoom,
      perundinganSend,
      chatMessage,
      pingToAll,
      disconnecting,
	    connectStatus,
	    showOnline,
    }
  }
