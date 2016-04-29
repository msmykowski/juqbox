const db = require('./db');

function bindOptions(eventHandler, ...options) {
  return (msg) => eventHandler(msg, ...options);
}

function generateEventListener(eventName, eventHandler) {
  return (listener, ...options) => {
    return listener && listener.on(eventName, bindOptions(eventHandler, ...options));
  };
}

function generateEventListeners(events) {
  return Object.keys(events).reduce((memo, key) => {
    memo[key] = generateEventListener(key, events[key]);
    return memo;
  }, {});
}

const tableUpdateHandler = generateEventListener('data', (message, io, tableName) => {
  const {new_val: newVal} = message;
  io.emit(`${tableName}Update${newVal.id}`, newVal);
});

function dbChangeListener(io, tableName) {
  db.establishConnection()
  .then((conn) => {
    db.changes({tableName}, function(err, feed) {
      if (err) conn.close();
      tableUpdateHandler(feed, io, tableName);
    }, conn);
  });
};

module.exports = {generateEventListener, generateEventListeners, dbChangeListener};
