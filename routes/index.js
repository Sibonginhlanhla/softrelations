var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // can use imported repository objects to pass request data
  // and receive res data
  data = { title: 'Express' } // asign the response data here
  res.render('index', data);
});

// add more methods to router like put, update, post, update associated with resource,
// user in this case

module.exports = router;
