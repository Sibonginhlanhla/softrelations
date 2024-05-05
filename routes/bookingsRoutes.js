var express = require('express');
var router = express.Router();

const bookingsController = require('../controllers/bookingsController');

// endpoints below
router.get('/');
router.get('/all');
router.get('/meals/');
router.get('/meals/:meal_id');
router.get('/meals/options');
router.post('/meals/options');
router.delete('/meals/:meal_id');
router.get('/car-wash/');
router.get('/car-wash/available-slots');
router.post('/car-wash/reservation/:slot_id');
router.delete('/car-wash/reservation/:slot_id');
router.post('/car-wash/slot');
router.delete('/car-wash/slot/:slot_id');


module.exports = router;