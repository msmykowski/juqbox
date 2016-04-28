const db = require('./db');

const onPlaylistHandler = (socket) => {
  return (id) => {
    db.establishConnection()
    .then((conn) => {
      db.get({tableName: 'playlists', id}, conn)
      .then((data) => {
        socket.emit('getPlaylist', data);
        conn.close();
      });
    });
  };
};

module.exports = {
  onConnectionHandler: (socket) => {
    socket.on('playlistId', onPlaylistHandler(socket));
  }
};
