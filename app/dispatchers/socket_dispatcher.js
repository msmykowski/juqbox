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
  entriesUpdate({data: {entries}}) {
    this.$store.refine('entries').set(entries);
  }
};

module.exports = SocketDispatcher;
