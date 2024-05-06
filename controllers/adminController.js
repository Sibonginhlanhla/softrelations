const AdminModel = require("../models/AdminModel");
const md5 = require('md5'); // to hash password before logging admin in
const {createToken} = require('../utils/jwt-tokenizer')
var adminModel = new AdminModel();

const get_admin_dashboard = (req, res)=>{
    // implementation needed
    res.render('admin/index')
}

const get_admin_login = (req, res)=>{
    res.render('admin/login');
}

const post_admin_login = (req, res)=>{
    const adminid = req.body.adminid;
    const password = req.body.password;
    
    const passwordhash = md5(password);
    // access model here
    var correctLogin = adminModel.verifyPassword(adminid, passwordhash); //boolean

    // if correctLoogin ... add session cookie and redirect to to admin index page
    // or send success message and redirect from front end

    if (correctLogin){
        var token = createToken(adminid);
        res.cookie('admin-session', token, {httpOnly: true});
        res.json({message: 'success'});
    }else{
        res.json({message: 'failed'});
    }
}

const get_admin_manageusers_page = (req, res)=>{
    res.render('admin/manageusers');
}

const get_admin_accesscontrol_page = (req, res)=>{
    res.render('admin/accesscontrol');
}

module.exports = {
    get_admin_dashboard,
    get_admin_login,
    post_admin_login,
    get_admin_manageusers_page,
    get_admin_accesscontrol_page
}