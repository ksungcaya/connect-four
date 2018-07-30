import game from './game';

export default io => (socket) => {
  game.init(io, socket);
};
