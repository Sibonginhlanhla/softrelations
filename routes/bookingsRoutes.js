var express = require('express');
var router = express.Router();

const bookingsController = require('../controllers/bookingsController');
const {userAuthenticate} = require('../middleware/userAuthenticate');
const {userAccessControl} = require('../middleware/userAccessControl');

// endpoints below
router.get('/', userAuthenticate, userAccessControl);
router.get('/create', userAuthenticate, userAccessControl, bookingsController.get_bookings_page);
router.get('/all', userAuthenticate, userAccessControl, bookingsController.get_all_bookings);
router.get('/meals/', userAuthenticate, userAccessControl);
router.get('/meals/:meal_id', userAuthenticate, userAccessControl);
router.get('/meals/options', userAuthenticate, userAccessControl);
router.post('/meals/options', userAuthenticate, userAccessControl);
router.delete('/meals/:meal_id', userAuthenticate, userAccessControl);
router.get('/car-wash/', userAuthenticate, userAccessControl);
router.get('/car-wash/available-slots', userAuthenticate, userAccessControl);
router.post('/car-wash/reservation/:slot_id', userAuthenticate, userAccessControl);
router.delete('/car-wash/reservation/:slot_id', userAuthenticate, userAccessControl);
router.post('/car-wash/slot', userAuthenticate, userAccessControl);
router.delete('/car-wash/slot/:slot_id', userAuthenticate, userAccessControl);


module.exports = router;