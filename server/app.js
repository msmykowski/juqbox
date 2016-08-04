require('./env');
const events = require('./events');
const express = require('express');
const path = require('path');
const config = require('pui-react-tools/assets/config');
const {useWebpackDevMiddleware} = config;

const app = express();
const server = require('http').createServer(app);
server.listen(process.env.PORT || 3000, function() {
  process.send && process.send({cmd: 'ready'});
});

const io = require('socket.io')(server);

events.connection(io);
events.dbPlaylistUpdate(io);

module.exports = app;
