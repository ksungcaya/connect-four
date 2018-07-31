// TO DO fix this ugly file.
function init(io, socket) {
  socket.on('join-game', (game) => {
    socket.join(game);
    socket.broadcast.to(game).emit('joinGame');
  });

  socket.on('player-assign', (game, player) => {
    socket.broadcast.to(game).emit('playerAssigned', player);
  });

  socket.on('player-ready', (game, player) => {
    socket.broadcast.to(game).emit('otherPlayerReady', player);
  });

  socket.on('all-ready', (game, readyPlayers) => {
    const players = Object.values(readyPlayers);

    socket.broadcast.to(game).emit('playerTurn', players[0], 0);
    io.in(game).emit('changeTurn', players[0]);
  });

  socket.on('turn-over', (game, col, player, lastIndex, readyPlayers) => {
    const players = Object.values(readyPlayers);

    let newIndex = lastIndex + 1;

    if (players[newIndex] === undefined) {
      newIndex = 0;
    }

    const newPlayer = players[newIndex];

    socket.broadcast.to(game).emit('playerTurn', newPlayer, newIndex, player, col);
    io.in(game).emit('changeTurn', newPlayer); // update turn status
  });

  socket.on('player-won', (game, winner) => {
    io.in(game).emit('playerWon', winner);
  });

  socket.on('game-draw', (game) => {
    io.in(game).emit('gameDraw');
  });

  socket.on('player-left', (game, player) => {
    socket.broadcast.to(game).emit('playerDisconnected', player);
  });
}

export default {
  init,
};
