const db = require('./db');
const {generateEventListener, generateEventListeners} = require('./socket_api');

const playlistId = (id, listener) => {
  db.establishConnection()
  .then((conn) => {
    db.get({tableName: 'playlists', id}, conn)
    .then((data) => {
      listener.emit('getPlaylist', data);
      conn.close();
    });
  });
};
const connection = generateEventListener('playlistId', playlistId);

const events = {playlistId, connection};
const listeners = generateEventListeners(events);

module.exports = listeners;
