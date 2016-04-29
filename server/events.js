const db = require('./db');
const {generateEventListener, generateEventListeners} = require('./socket_api');

const playlistId = generateEventListener('playlistId', (id, listener) => {
  db.establishConnection()
  .then((conn) => {
    db.get({tableName: 'playlists', id}, conn)
    .then((data) => {
      listener.emit('getPlaylist', data);
      conn.close();
    });
  });
});

const handlePlaylistUpdate = generateEventListener('data', (message, io) => {
  const {new_val: newVal} = message;
  io.emit(`updatePlaylist${newVal.id}`, newVal);
});

const connection = playlistId;

const onDbChanges = (io) => {
  db.establishConnection()
  .then((conn) => {
    db.changes({tableName: 'playlists'}, function(err, feed) {
      if (err) conn.close();
      handlePlaylistUpdate(feed, io);
    }, conn);
  });
};

const events = {connection};
const listeners = generateEventListeners(events);

module.exports = {listeners, onDbChanges};
