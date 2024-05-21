var express = require('express');
var router = express.Router();
const adminController = require("../controllers/adminController");
const {adminAuthenticate} = require('../middleware/adminAuthenticate')

router.get('/',adminAuthenticate, adminController.get_admin_dashboard);
router.get('/login', adminController.get_admin_login);
router.post('/login', adminController.post_admin_login);
router.get('/logout', adminController.put_admin_logout);
router.get('/user-management',adminAuthenticate, adminController.get_admin_manageusers_page);
router.post('/user-add',adminAuthenticate, adminController.post_admin_adduser);
router.delete('/user-remove/:user_id', adminAuthenticate, adminController.delete_admin_removeuser);
router.put('/user-update', adminAuthenticate, adminController.put_admin_updateuser);
router.get('/access-control',adminAuthenticate, adminController.get_admin_accesscontrol_page);
router.post('/user-permissions', adminAuthenticate, adminController.get_user_permissions);
router.put('/user-permissions', adminAuthenticate, adminController.put_user_permissions);
router.get('/default-permissions'); // reserved
router.post('/default-permissions'); // reserved
router.get('/added-permissions'); // reserved
router.post('/added-permissions'); // reserved

module.exports = router;