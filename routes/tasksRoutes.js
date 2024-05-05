var express = require('express');
var router = express.Router();

const tasksController = require('../controllers/tasksController');

// endpoints below
router.get('/');
router.get('/listing');
router.get('/:task_id');
router.post('/assignment');
router.put('/completion/:task_id')

module.exports = router;