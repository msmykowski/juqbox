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

module.exports = {generateEventListener, generateEventListeners};
