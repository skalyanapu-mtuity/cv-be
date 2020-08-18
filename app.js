const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const indexRouter = require('./routes/index');
const socketIo = require("socket.io");
const app = express();
const http = require("http");
const config = require('./config/config');
const signals = require('./signals/index');
const logging = require('./common/logging/index');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routes middleware
 */
app.use('/twitter', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


let server = http.createServer(app);
const io = socketIo(server);

const stream = require('./routes/streamHandler')(io); // Using DP injection pattern to share socket instance

// we could do clustering for enhanced performance
server.listen(config.httpPort, () => {
  logging.info(`Listening on *:${config.httpPort}`);
});

const shutdown = signals.init(async () => {
  await server.close();
});

/**
 * To have graceful shutdown
 * to enhace the useability better to use NODEMON kind
 * of packages
 */
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = app;
