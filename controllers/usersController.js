const UsersModel = require("../models/UsersModel");
var usersModel = new UsersModel();

const get_user_dashboard = (req, res) => {
    const user = req.user;
    res.locals.user = user;
    res.render('dashboard');
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
        const userRegisterSuccess = usersModel.registerUser(user.googleid, user.email);
        if (userRegisterSuccess){
            res.cookie('session-token', token, {httpOnly: true, maxAge: 2700000});
            res.redirect('/'); // continue to dashboard
        }
        else{
            // OTHERWISE REDIRECT TO SIGN AGAIN (either incorrect g account/error)
            res.redirect('/signin');
        }
    })
    .catch(()=>{
        res.redirect('/signin');
    });
}

const get_user_signout = (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/signin');
}

const get_user_profilepage = (req, res)=>{
    // user object passed from AccessControl(authorization)
    // delete the googleId property
    const user = req.user;
    delete user.googleId;
    
    res.locals.user = user;

    res.render('userprofile');
}

module.exports = {
    get_user_dashboard,
    get_user_signin_page,
    post_user_signin_g_callback,
    get_user_signout,
    get_user_profilepage
}