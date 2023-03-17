const express = require('express');
const bodyVerifier = require('../middlewares/bodyVerifier');
const router = express.Router();
const { reviews, metadata } = require('../controllers');

router.use(bodyVerifier);

router.get('/', reviews.get);

router.get('/meta', metadata.get);

router.post('/', reviews.post);

router.put('/:review_id/helpful', reviews.markHelpful);

router.put('/:review_id/report', reviews.report);

module.exports = router;
