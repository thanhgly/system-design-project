const express = require('express');
const bodyVerifier = require('../middlewares/bodyVerifier');
const queriesVerifier = require('../middlewares/queriesVerifier');
const caching = require('../middlewares/caching');
const router = express.Router();
const { reviews, metadata } = require('../controllers');

router.use(queriesVerifier);
router.use(bodyVerifier);
router.use(caching);

router.get('/', reviews.get);

router.get('/meta', metadata.get);

router.post('/', reviews.post);

router.put('/:review_id/helpful', reviews.markHelpful);

router.put('/:review_id/report', reviews.report);

module.exports = router;
