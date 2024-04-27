const isLoggedIn = (req, res, next) => {
    if(!req.signedCookies.token){
        return res.send({status:401, message:'You have to login first'});
    }
    next();
}

module.exports = {isLoggedIn};