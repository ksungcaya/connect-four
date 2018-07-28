import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendfile(`${__dirname}/../public/index.html`);
});

export default router;
