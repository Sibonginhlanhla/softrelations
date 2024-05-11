var express = require('express');
var router = express.Router();

const feedbackController = require('../controllers/feedbackController');
const {userAuthenticate} = require('../middleware/userAuthenticate');
const {userAccessControl} = require('../middleware/userAccessControl');

// endpoints below
router.get('/', userAuthenticate, userAccessControl);
router.get('/listing', userAuthenticate, userAccessControl);
router.get('/:feedback_id', userAuthenticate, userAccessControl);
router.get('/create', userAuthenticate, userAccessControl);
router.post('/create', userAuthenticate, userAccessControl);
router.get('/posted', userAuthenticate, userAccessControl);
router.post('/feedback-request', userAuthenticate, userAccessControl);

module.exports = router;