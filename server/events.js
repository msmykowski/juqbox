const db = require('./db');
const {generateEventListener, generateEventListeners, dbChangeListener} = require('./event_api');

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

const playlistUpdate = (io) => dbChangeListener(io, 'playlists');
const connection = playlistId;

const events = {...generateEventListeners({connection}), playlistUpdate};

module.exports = events;
