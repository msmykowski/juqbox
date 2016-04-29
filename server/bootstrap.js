require('babel-core/register');
require('babel-polyfill');
const events = require('./events');
/* eslint-disable no-var */
var app = require('./app');
/* eslint-enable no-var */

const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 3000, function() {
  process.send && process.send({cmd: 'ready'});
});

events.listeners.connection(io, io);
events.onDbChanges(io);

module.exports = app;
