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

const tableUpdateHandler = generateEventListener('data', (message, listener, tableName) => {
  const {new_val: newVal} = message;
  listener.emit(`${tableName}${newVal.id}`, newVal);
});

function dbChangeListener(listener, tableName) {
  db.changes({tableName}, function(err, feed) {
    tableUpdateHandler(feed, listener, tableName);
  });
};

module.exports = {generateEventListener, generateEventListeners, dbChangeListener};
