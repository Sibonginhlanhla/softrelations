var express = require('express');
var router = express.Router();

const feedbackController = require('../controllers/feedbackController');
const {userAuthenticate} = require('../middleware/userAuthenticate');
const {userAccessControl} = require('../middleware/userAccessControl');

// endpoints below
router.get('/', userAuthenticate, userAccessControl);
router.get('/listing', userAuthenticate, userAccessControl, feedbackController.get_user_feedback);
router.get('/listingtwo', userAuthenticate, userAccessControl, feedbackController.get_user_feedback_to);
router.get('/:feedback_id', userAuthenticate, userAccessControl);
router.get('/create', userAuthenticate, userAccessControl, feedbackController.get_user_feedbackpage);
router.post('/createentry', userAuthenticate, userAccessControl, feedbackController.post_user_feedback);
router.get('/posted', userAuthenticate, userAccessControl, feedbackController.get_user_pfeedbacks);
router.get('/postedtwo', userAuthenticate, userAccessControl, feedbackController.get_user_pfeedbacks_two);
router.post('/feedback-request', userAuthenticate, userAccessControl);
router.get('/role', userAuthenticate, userAccessControl, feedbackController.get_user_role);

module.exports = router;