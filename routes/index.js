require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = express.Router();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' // Replace this with a more secure secret or use an environment variable
}));

app.use(passport.initialize());  // init passport on every route call
app.use(passport.session());     // allow passport to use "express-session"

passport.serializeUser(function(user, cb) {
  //console.log(`\n--------> Serialize User:`)
  //console.log(user._json.email)  
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  //console.log("\n--------- Deserialized User:")
  //console.log(user)  
  cb(null, obj);
});

user = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  }, user
));



app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/success', (req, res) => {
    res.render('success');
});

app.get('/error', (req, res) => {
    res.send("Error logging in");
});

app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
        res.redirect('/success');
    }
);

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/success")
}

app.get("/success", checkAuthenticated, (req, res) => {
  res.render("success", {name: req.user.displayName})
})

app.post("/logout", (req,res) => {   //logout?
  req.logOut()
  res.redirect("/index")
  console.log(`-------> User Logged out`)
})

//console.log() values of "req.session" and "req.user" so we can see what is happening during Google Authentication
let count = 1
showlogs = (req, res, next) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)
  
    console.log(`\n req.user -------> `) 
    console.log(req.user) 
  
    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`) 
    console.log(`req.session.cookie -------> `) 
    console.log(req.session.cookie) 
  
    console.log("===========================================\n")

    next()
}

app.use(showlogs)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port ' + port);
});

module.exports = router;
