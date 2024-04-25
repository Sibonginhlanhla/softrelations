var express = require('express');
var AdminRepo = require('../../models/adminrepo');

var router = express.Router();

/**
 * GET admin dashboard page
 */
router.get('/', function(req, res, next) {
  const adminRepo = new AdminRepo();
  
  adminDetails = adminRepo.getAdminDetails();
  
  adminRepo.closeDBConnection();

  res.status(200).json(adminDetails);
});


module.exports = router;
