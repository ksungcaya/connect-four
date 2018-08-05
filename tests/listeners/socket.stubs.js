import sinon from 'sinon';

const io = {
  emit: sinon.stub(),
  in: sinon.stub().returnsThis(),
};

const socket = {
  join: sinon.stub(),
  broadcast: {
    to: sinon.stub().returnsThis(),
    emit: sinon.stub(),
  },
};

export {
  socket,
  io,
};

export default {};
