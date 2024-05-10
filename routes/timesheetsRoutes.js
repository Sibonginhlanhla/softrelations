var express = require('express');
var router = express.Router();

const timesheetsController = require('../controllers/timesheetsController');

// NB. endpoints below likely need to be reworked!
router.get('/');
router.get('/listing');
router.get('/create', timesheetsController.get_user_timesheet_page);
router.post('/create');
router.get('/:timesheet_id');
router.delete('/:timesheet_id');

router.get('/tasks');
router.get('/tasks/listing');
router.get('/tasks/:task_id');
router.post('/tasks/assignment');
router.put('/tasks/completion/:task_id');


module.exports = router;