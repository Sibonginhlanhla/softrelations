const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./authConstants');

const createToken = (data)=>{
    return jwt.sign({data}, JWT_SECRET)
}

module.exports = {
    createToken
}