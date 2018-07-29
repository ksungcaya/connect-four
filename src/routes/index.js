import express from 'express';
import games from './games';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendfile(`${__dirname}/../public/index.html`);
});

router.use('/api/games', games);

export default router;
