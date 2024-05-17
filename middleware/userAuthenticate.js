const {OAuth2Client} = require('google-auth-library');
const {CLIENT_ID} = require('../utils/authConstants');
const client = new OAuth2Client(CLIENT_ID);

const UsersModel = require("../models/UsersModel");
var usersModel = new UsersModel();

const userAuthenticate = function(req, res, next){

    const token = req.cookies['session-token'];

    // define user object to be passed to follwing middleware to silently sign the user in
    const user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();

        user.googleid = payload['sub'];
        user.email = payload['email'];
    }
    verify()
    .then(()=>{
        // check if user has account(googleId still in db)
        const _user = usersModel.getUserDetails(user.googleid);
        if (!_user){ // no googleId
            // clear session cookie
            res.clearCookie('session-token');
            res.redirect('/signin');
        }else{
            req.user = user; // pass the user(g_id & email) info to next middleware
            next();
        }
    })
    .catch(()=>{
        res.redirect('/signin');
    });
}


module.exports = {
    userAuthenticate
}