var md5 = require('md5');

const ADMIN_PASS = "sr-33@44"; // this is my admin password

var passHash = md5(ADMIN_PASS);

console.log(passHash);