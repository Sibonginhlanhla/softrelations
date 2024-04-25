var express = require('express');
var AdminRepo = require('../../models/adminrepo');
var router = express.Router();

// GET admin static login page
router.get('/login', (req, res)=>{
    // skip this
    res.render('admin/login');
});

// this endpoint should be called by a 'login' button click
router.post('/login', (req, res)=>{
    var adminid = req.body.adminid;
    var password = req.body.password;
    const adminRepo = new AdminRepo();

    // var correctLogin = adminRepo.verifyPassword(adminid, password); //boolean

    // if correctLoogin ... add session cookie and redirect to to admin index page
    // or send success message and redirect from front end
    // var session_adm = req.cookies('session_adm');

    // else res.json({message: 'unsuccessful'})
});

module.exports = router;