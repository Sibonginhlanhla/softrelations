var express = require('express');
var router = express.Router();

const timesheetsController = require('../controllers/timesheetsController');

// endpoints below
router.get('/');
router.get('/listing');
router.get('/create', timesheetsController.get_user_createtimesheet_page);
router.post('/create');
router.get('/:timesheet_id');
router.delete('/:timesheet_id');


module.exports = router;