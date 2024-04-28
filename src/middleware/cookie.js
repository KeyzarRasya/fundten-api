const { jwtDecode } = require("jwt-decode");
const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    if(!req.signedCookies.token){
        return res.send({status:401, message:'You have to login first'});
    }
    next();
}

const isAlreadyOffering = (req, res, next)=>{
    const account = jwtDecode(req.signedCookies.token);
    console.log(account);
    if(!account.user.offering){
        console.log("JALAN")
        return next();
    }
    return res.send({status:406, message:'you already have one offering'})
}

module.exports = {isLoggedIn, isAlreadyOffering};