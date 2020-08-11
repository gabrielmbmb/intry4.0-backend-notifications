const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(function (_req, res, next) {
  res.io = io;
  next();
});
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'ah sheep',
  });
  res.io.emit('ahsheep', 'hello sheep');
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = {
  server,
  app,
};
