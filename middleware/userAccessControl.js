const {cleanURL} = require('../utils/URL-utils')
const UserModel = require('../models/UsersModel');
const userModel = new UserModel();


const userAccessControl = (req, res, next)=>{
    const user_g_id = req.user.googleid;
    let user = userModel.getUserDetails(user_g_id);

    const url = cleanURL(
                req.originalUrl,
                Object.keys(req.params).length ? true : false
            );
    const method = req.method;

    if (user){
        // cheeck if user has access to the calling endpoint!
        

        req.user = user;
        next();
        return;
    }
    res.redirect('/');
    return;
}

module.exports = {
    userAccessControl
}