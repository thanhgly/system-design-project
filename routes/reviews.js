const express = require('express');
const bodyVerifier = require('../middlewares/bodyVerifier');
const router = express.Router();
const { reviews, metadata } = require('../controllers');

router.use(bodyVerifier);

router.get('/', reviews.get);

router.get('/meta', metadata.get);

router.post('/', reviews.post);

router.put('/:review_id/helpful', (req, res) => {
  let review_id = req.params.review_id;
  res.sendStatus(204);
});

router.put('/:review_id/report', (req, res) => {
  let review_id = req.params.review_id;
  res.sendStatus(204);
});

module.exports = router;
