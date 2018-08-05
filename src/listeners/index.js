import Game from './Game';

const events = [];

export default io => (socket) => {
  const listeners = {
    game: new Game(events, io, socket),
  };

  Object.keys(listeners).forEach((listener) => {
    const set = listeners[listener].get();

    Object.keys(set).forEach((event) => {
      socket.on(event, set[event]);
    });
  });

  events.push(socket);
};
