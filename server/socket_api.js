function bindListener(eventHandler, listener) {
  return (msg) => eventHandler(msg, listener);
}

function generateEventListener(eventName, eventHandler) {
  return (listener) => {
    return listener.on(eventName, bindListener(eventHandler, listener));
  };
}

function generateEventListeners(events) {
  return Object.keys(events).reduce((memo, key) => {
    memo[key] = generateEventListener(key, events[key]);
    return memo;
  }, {});
}

module.exports = {generateEventListener, generateEventListeners};
