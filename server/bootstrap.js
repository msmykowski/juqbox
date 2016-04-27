require('babel-core/register');
require('babel-polyfill');
const db = require('./db');

/* eslint-disable no-var */
var app = require('./app');
/* eslint-enable no-var */

const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 3000, function() {
  process.send && process.send({cmd: 'ready'});
});

io.on('connection', (socket) => {
  socket.on('playlistId', (id) => {
    db.establishConnection()
    .then((conn) => {
      db.get({tableName: 'playlists', id}, conn)
      .then((data) => {
        socket.emit('getPlaylist', data);
        conn.close();
      });
    });
  });
});

module.exports = app;
