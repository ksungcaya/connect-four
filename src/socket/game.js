// TO DO fix this ugly file.
function init(io, socket) {
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
}

export default {
  init,
};
