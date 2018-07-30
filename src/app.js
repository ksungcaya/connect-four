import http from 'http';
import morgan from 'morgan';
import logger from 'winston';
import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import routes from './routes';

const isProduction = process.env.NODE_ENV === 'production';
const app = express();
const server = http.Server(app);
const io = socketio(server);

// Normal express config defaults
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../public`));

if (!isProduction) {
  app.use(errorhandler());
}

// view templating
app.set('views', `${__dirname}/views`);
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res) => {
    logger.log(err.stack);

    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

io.on('connection', (socket) => {
  socket.on('join-game', (game) => {
    socket.join(game);

    socket.on('player-assign', (player) => {
      socket.broadcast.to(game).emit('playerAssigned', player);
    });

    socket.on('player-ready', (player) => {
      socket.broadcast.to(game).emit('otherPlayerReady', player);
    });

    socket.on('all-ready', (readyPlayers) => {
      const players = Object.values(readyPlayers);

      socket.broadcast.to(game).emit('playerTurn', players[0], 0);
      io.in(game).emit('changeTurn', players[0]);

      socket.on('turn-over', (col, player, lsatIndex) => {
        let newIndex = lsatIndex + 1;

        if (players[newIndex] === undefined) {
          newIndex = 0;
        }

        const newPlayer = players[newIndex];

        socket.broadcast.to(game).emit('playerTurn', newPlayer, newIndex, player, col);
        io.in(game).emit('changeTurn', newPlayer); // update turn status

        socket.on('player-won', (winner) => {
          io.in(game).emit('playerWon', winner);
        });
      });
    });

    socket.on('player-left', (player) => {
      io.in(game).emit('playerDisconnected', player);
    });
  });
});

export default server;
