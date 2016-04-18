require('./env');
const express = require('express');
const path = require('path');
const config = require('pui-react-tools/assets/config');
const {useWebpackDevMiddleware} = config;

const userRouter = require('./user_router');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/user', userRouter(app));

if (useWebpackDevMiddleware) {
  const webpackHotMiddleware = require('pui-react-tools/middleware/webpack');
  app.use(...webpackHotMiddleware());
  app.get('*', webpackHotMiddleware.url('/index.html'));
}

module.exports = app;
