const {save, loginAccount, createOffer} = require('../service/umkm');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const {ownerName, umkmName, email, password, description} = req.body;
    const saveUmkm = await save({ownerName, umkmName, email, password, description});
    res.send(saveUmkm);
}

const login = async(req, res) => {
    const {email, password} = req.body;
    const account = await loginAccount({email, password});
    if(account.status !== 200){
        res.send(account);
    }
    const token = await jwt.sign({user:account.user}, process.env.JWT, {expiresIn:'1h'});
    res.cookie("token", token, {signed:true});
    res.send({status:account.status, token});
}

const makeOffering = async(req, res) => {
    const {umkmid = "662c9f7ecc5f468928a238fb", amount = 1000000} = req.body;
    const files = req.file.filename;
    const account = await createOffer(req.signedCookies, {umkmid, amount, proyeksi:files});
    res.send(account);
}

module.exports = {signup, login, makeOffering};