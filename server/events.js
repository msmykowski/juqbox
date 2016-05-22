const db = require('./db');
const {generateEventListener, generateEventListeners, dbChangeListener} = require('./event_api');

const playlistIdEventListener = generateEventListener('playlistId', (id, listener) => {
  return db.get({tableName: 'playlists', id})
  .then((data) => {
    listener.emit(`playlists${id}`, data);
  });
});

const playlistUpdateEventListener = generateEventListener('playlistUpdate', (data) => {
  const {id, entry} = data;
  return db.append({tableName: 'playlists', id, property: 'entries', data: entry});
});

const dbPlaylistUpdate = (io) => dbChangeListener(io, 'playlists');

const connection = (listener) => {
  playlistIdEventListener(listener, listener);
  playlistUpdateEventListener(listener);
};

const events = {...generateEventListeners({connection}), dbPlaylistUpdate};

module.exports = events;
