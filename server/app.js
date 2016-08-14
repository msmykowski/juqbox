require('./env');
const events = require('./events');
const express = require('express');

const app = express();
const server = require('http').createServer(app);

server.listen(process.env.PORT || 3000, function() {
  process.send && process.send({cmd: 'ready'});
});

require('./db.js').connect();
const io = require('socket.io')(server);

events.connection(io);
events.dbPlaylistUpdate(io);

module.exports = app;
