var express = require('express');
var router = express.Router();

const timesheetsController = require('../controllers/timesheetsController');
const {userAuthenticate} = require('../middleware/userAuthenticate');
const {userAccessControl} = require('../middleware/userAccessControl');

// NB. endpoints below likely need to be reworked!
router.get('/', userAuthenticate, userAccessControl);
router.get('/listing', userAuthenticate, userAccessControl, timesheetsController.get_user_timesheets);
router.get('/create', userAuthenticate, userAccessControl, timesheetsController.get_user_timesheet_page);
router.post('/createentry', userAuthenticate, userAccessControl, timesheetsController.post_user_timesheet);
router.get('/:timesheet_id', userAuthenticate, userAccessControl);
router.delete('/:timesheet_id', userAuthenticate, userAccessControl);

router.get('/tasks', userAuthenticate, userAccessControl);
router.get('/tasks/listing', userAuthenticate, userAccessControl);
router.get('/tasks/:task_id', userAuthenticate, userAccessControl);
router.post('/tasks/assignment', userAuthenticate, userAccessControl);
router.put('/tasks/completion/:task_id', userAuthenticate, userAccessControl);


module.exports = router;