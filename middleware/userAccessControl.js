const UserModel = require('../models/UsersModel');
const userModel = new UserModel();

const userAccessControl = (req, res, next)=>{
    const user_g_id = req.user.googleid;
    let user = userModel.getUserDetails(user_g_id);
    if (user){
        req.user = user;
        next();
        return;
    }
    res.redirect('/signin');
}

module.exports = {
    userAccessControl
}