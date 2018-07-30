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

router.post('/lock', (req, res) => {
  res.json(game.lock(req.body.id));
});

router.post('/unlock', (req, res) => {
  res.json(game.unlock(req.body.id));
});

router.post('/end', (req, res) => {
  res.json(game.end(req.body.id));
});

router.get('/:id', (req, res) => {
  res.json(game.find(req.params.id));
});

export default router;
