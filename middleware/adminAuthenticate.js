const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../utils/authConstants');

const adminAuthenticate = function(req, res, next){

    const token = req.cookies['admin-session'];
    if (token){
        jwt.verify(token, JWT_SECRET, (err, decodeToken)=>{
            if (err){
                res.redirect('/admin/login');
            }else{
                req.adminid = decodeToken.data;
                next();
            }
        });
    }else{
        res.redirect("/admin/login");
    }
}


module.exports = {
    adminAuthenticate
}