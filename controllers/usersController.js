const UsersModel = require("../models/UsersModel");
var usersModel = new UsersModel();

const get_user_dashboard = (req, res) => {
    const user = req.user; // logic needed here.
    res.render('dashboard', user);
}

const get_user_signin_page = (req, res)=>{
    res.render('signin');
}

// careful, this is Google OAuth callback
const  post_user_signin_g_callback = (req, res, next)=>{

    const {OAuth2Client} = require('google-auth-library');
    const {CLIENT_ID} = require('../utils/authConstants');
    const client = new OAuth2Client(CLIENT_ID);

    const token = req.body.credential;

    // define user to be silently signed up/in
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
        // CAN ADD THE googleid INTO OUR DB, IF email ALSO MATCHES, THEN:
        res.cookie('session-token', token, {httpOnly: true});
        res.redirect('/'); // continue to dashboard

        // OTHERWISE REDIRECT TO SIGN AGAIN
        
    })
    .catch(()=>{
        res.redirect('/signin');
    });
}

const get_user_signout = (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/signin');
}

module.exports = {
    get_user_dashboard,
    get_user_signin_page,
    post_user_signin_g_callback,
    get_user_signout
}