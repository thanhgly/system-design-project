const express = require('express');
const router = express.Router();
const { reviews, metadata } = require('../controllers');

router.get('/', reviews.get);

router.get('/meta', metadata.get);

router.post('/', (req, res) => {
  res.sendStatus(201);
});

router.put('/:review_id/helpful', (req, res) => {
  let review_id = req.params.review_id;
  res.sendStatus(204);
});

router.put('/:review_id/report', (req, res) => {
  let review_id = req.params.review_id;
  res.sendStatus(204);
});

module.exports = router;
