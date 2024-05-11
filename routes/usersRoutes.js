var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');
const {userAuthenticate} = require('../middleware/userAuthenticate');
const {userAccessControl} = require('../middleware/userAccessControl');

router.get('/', userAuthenticate, userAccessControl, usersController.get_user_dashboard);
router.get('/signin', usersController.get_user_signin_page);
router.post('/signin', usersController.post_user_signin_g_callback);
router.get('/signout', usersController.get_user_signout);
router.get('/user'); // potentially useless
router.get('/profile');
router.get('/exports/csv/:exported_res'); // should send back appropriate report(timesheet/feedback)
router.get('/notifications');
router.post('/notifications');
router.get('/notifications/:id');
router.get('/notifications/check');

module.exports = router;