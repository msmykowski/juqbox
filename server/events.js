const db = require('./db');
const {generateEventListener, generateEventListeners, dbChangeListener} = require('./event_api');

const playlistIdEventListener = generateEventListener('playlistId', (id, listener) => {
  let conn;
  return db.establishConnection()
  .then((connection) => {
    conn = connection;
    return db.get({tableName: 'playlists', id}, conn);
  })
  .then((data) => {
    listener.emit(`playlists${id}`, data);
    conn.close();
  });
});

const playlistUpdateEventListener = generateEventListener('playlistUpdate', (data) => {
  const {id} = data;
  return db.establishConnection()
  .then((conn) => {
    return db.update({tableName: 'playlists', id, data}, conn);
  });
});

const dbPlaylistUpdate = (io) => dbChangeListener(io, 'playlists');

const connection = (listener) => {
  playlistIdEventListener(listener, listener);
  playlistUpdateEventListener(listener);
};

const events = {...generateEventListeners({connection}), dbPlaylistUpdate};

module.exports = events;
