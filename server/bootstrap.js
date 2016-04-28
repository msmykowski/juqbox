require('babel-core/register');
require('babel-polyfill');
const eventHandlers = require('./event_handlers');

/* eslint-disable no-var */
var app = require('./app');
/* eslint-enable no-var */

const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 3000, function() {
  process.send && process.send({cmd: 'ready'});
});

io.on('connection', eventHandlers.onConnectionHandler);

module.exports = app;
