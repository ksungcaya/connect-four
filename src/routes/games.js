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
  };

  db.get('games').push(data).write();

  res.json(data);
});

export default router;
