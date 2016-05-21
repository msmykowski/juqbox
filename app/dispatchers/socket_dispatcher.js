const io = require('socket.io-client');
const {Actions} = require('p-flux');

let socket;
const SocketDispatcher = {
  socketConnect({data: id}) {
    socket = io.connect('http://localhost:3000', {reconnect: true});
    socket.on('connect', function() {
      socket.emit('playlistId', Number(id));
      socket.on(`playlists${id}`, function(data) {
        Actions.entriesUpdate(data);
      });
    });
  },
  playlistUpdate({data}) {
    socket.emit('playlistUpdate', data);
  },
  entriesUpdate({data}) {
    this.$store.refine('playlist').set(data);
  }
};

module.exports = SocketDispatcher;
