const { jwtDecode } = require('jwt-decode');
const Umkm = require('../model/umkm');
const Offer = require('../model/Offer');
const bcrypt = require('bcrypt');

const save = async (umkm) => {
    const findUmkm = await Umkm.findOne({email:umkm.email});
    if(findUmkm){
        return {status:401, message:'email is already in used'};
    }
    const newUmkm = new Umkm(umkm);
    newUmkm.password = await bcrypt.hash(newUmkm.password, 12);
    await newUmkm.save();
    return {status:200, message:'Umkm Account Successfully created'};
}

const loginAccount = async(credentials) => {
    const findAccount = await Umkm.findOne({email:credentials.email});
    if(!findAccount){
        return {status:401, message:"Wrong email"};
    }
    const isValid = await bcrypt.compare(credentials.password, findAccount.password);
    return isValid? {status:200, message:"Login successfully", user:findAccount} : {status:401, message:"Wrong password"};
}

const createOffer = async(signedCookie ,offer) => {
    const cookieAcc = await jwtDecode(signedCookie.token);
    console.log(cookieAcc);
    const umkmAccount = await Umkm.findById(cookieAcc.user._id);
    if(!umkmAccount){
        return {status:401, message:'Please login first'};
    }
    offer.umkmId = umkmAccount._id;
    const newOffer = new Offer(offer);
    return newOffer;
}

module.exports = {save, loginAccount, createOffer};