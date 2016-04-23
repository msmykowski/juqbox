require('./env');
const express = require('express');
const path = require('path');
const config = require('pui-react-tools/assets/config');
const {useWebpackDevMiddleware} = config;

const app = express();

const userRouter = require('./user_router');
const playlistRouter = require('./user_router');

app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use('/user', userRouter(app));
// app.use('/playlist', playlistRouter(app));

if (useWebpackDevMiddleware) {
  const webpackHotMiddleware = require('pui-react-tools/middleware/webpack');
  app.use(...webpackHotMiddleware());
  app.get('*', webpackHotMiddleware.url('/index.html'));
}

async function createConnection(req, res, next) {
  try {
    req.dbConn = await r.connect({db: 'default'});
  } catch (err) {
    console.log("DB ERROR:\n", err);
  }
}

function closeConnection(req, res, next) {
    req.dbConn.close();
}

module.exports = app;
