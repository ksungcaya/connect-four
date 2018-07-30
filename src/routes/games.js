import express from 'express';
import shortid from 'shortid';
import db from '../db';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.get('games').value());
});

router.post('/', (req, res) => {
  const data = {
    id: shortid.generate(),
    name: req.body.name,
    cols: req.body.cols,
    rows: req.body.rows,
  };

  db.get('games').push(data).write();

  res.json(data);
});

router.get('/:id', (req, res) => {
  const data = db.get('games')
    .find({ id: req.params.id })
    .value();

  res.json(data);
});

export default router;
