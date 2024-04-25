var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // use usersrepo here
  // we will need timesheets repo since it is homepage
  // e.g call getUserDetails method
  data = { title: 'Dashboard' } // asign the response data here
  res.render('index', data);
});


module.exports = router;
