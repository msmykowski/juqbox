require('babel-core/register');
require('babel-polyfill');

const app = require('./app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const r = require('rethinkdb');

/* eslint-disable no-var */
/* eslint-enable no-var */
server.listen(process.env.PORT || 3000, function() {
  process.send && process.send({cmd: 'ready'});
});

io.on("connection", function(socket) {
  r.connect({db: 'default'}).then(function(conn) {
    console.log("server, socket connected:\n")
  })
});

module.exports = app;
