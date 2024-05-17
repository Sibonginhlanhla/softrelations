const AdminModel = require("../models/AdminModel");
const md5 = require('md5'); // to hash password before logging admin in
const {createToken} = require('../utils/jwt-tokenizer');
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
    const users = adminModel.getAllUsers();

    // populate form selects
    let select_template = "";
    users.forEach(user=>{
        select_template += `
            <option>
            ${user.firstName+"_"+user.lastName+"_"+user.roleName+"_"+user.email+"_"+user.userId}
            </option>
        `
    });

    //pass template to ejs
    res.locals.select_template = select_template;
    res.render('admin/manageusers');
}

const get_admin_accesscontrol_page = (req, res)=>{
    res.render('admin/accesscontrol');
}

const put_admin_logout = (req, res)=>{
    res.clearCookie('admin-session');
    res.redirect('/admin/login');
}

const post_admin_adduser = (req, res)=>{
    // recommended: simply pass body to model if you can
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const role = req.body.role;

    const added = adminModel.addUser(firstName,lastName,email,role);

    if (added){
        res.json({message: 'success'});
    }else{
        res.json({message: 'failed'});
    }
}

const delete_admin_removeuser = (req, res)=>{
    const userId = parseInt(req.params.user_id);

    const removed = adminModel.removeUser(userId);

    if (removed){
        res.json({message: "success"});
    }else{
        res.json({message: "failed"});
    }
}

const put_admin_updateuser = (req, res)=>{
    // recommended: simply pass body to model if you can
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const role = req.body.role;
    const userId = req.body.userId;
    
    const updated = adminModel.updateUser(firstName,lastName,email,role,userId);

    if (updated){
        res.json({message: "success"});
    }else{
        res.json({message: "failed"});
    }
}

module.exports = {
    get_admin_dashboard,
    get_admin_login,
    post_admin_login,
    get_admin_manageusers_page,
    get_admin_accesscontrol_page,
    put_admin_logout,
    post_admin_adduser,
    delete_admin_removeuser,
    put_admin_updateuser
}