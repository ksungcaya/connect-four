import express from 'express';
import Game from '../services/game';

const router = express.Router();
const game = new Game();

router.get('/', (req, res) => {
  res.json(game.get());
});

router.post('/', (req, res) => {
  res.json(game.create(req.body));
});

router.get('/:id', (req, res) => {
  res.json(game.find(req.params.id));
});

export default router;
