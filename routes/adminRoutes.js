var express = require('express');
var router = express.Router();
const adminController = require("../controllers/adminController");
const {adminAuthenticate} = require('../middleware/adminAuthenticate')

router.get('/',adminAuthenticate, adminController.get_admin_dashboard);
router.get('/login', adminController.get_admin_login);
router.post('/login', adminController.post_admin_login);
router.put('/logout');
router.get('/user-management',adminAuthenticate, adminController.get_admin_manageusers_page);
router.post('/user-add');
router.delete('/user-remove/:user_id');
router.get('/access-control',adminAuthenticate, adminController.get_admin_accesscontrol_page)
router.get('/default-permissions');
router.post('/default-permissions');
router.get('/added-permissions');
router.post('/added-permissions');

module.exports = router;