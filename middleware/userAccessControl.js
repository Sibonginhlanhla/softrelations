const {cleanURL} = require('../utils/URL-utils')
const UserModel = require('../models/UsersModel');
const PermissionsModel = require("../models/PermissionsModel");

const userModel = new UserModel();
const permissionsModel = new PermissionsModel();


const userAccessControl = (req, res, next)=>{
    const user_g_id = req.user.googleid;
    let user = userModel.getUserDetails(user_g_id);

    const userId = user.userId;
    const role = user.roleName;
    const url = cleanURL(
                req.originalUrl,
                Object.keys(req.params).length ? true : false
            );
    const method = req.method;
    
    if (user){
        // cheeck if user has access to the calling endpoint!
        const allowed = permissionsModel.hasEndpointPermission(
            userId, role, url, method
        );

        if (allowed){
            // available to any authorized endpoint 
            req.user = user;
            res.locals.user = user;
            next();
            return;
        }else{
            res.render('noaccess')
            return;
        }
    }
    res.redirect('/');
    return;
}

module.exports = {
    userAccessControl
}