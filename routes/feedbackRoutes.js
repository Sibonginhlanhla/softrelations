var express = require('express');
var router = express.Router();

const feedbackController = require('../controllers/feedbackController');

// endpoints below
router.get('/');
router.get('/listing');
router.get('/:feedback_id');
router.get('/create');
router.post('/create');
router.get('/posted');
router.post('/feedback-request');

module.exports = router;