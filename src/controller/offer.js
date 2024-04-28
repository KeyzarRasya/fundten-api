const {getAllOffer, deleteOffer} = require('../service/offer');
const jwt = require('jsonwebtoken')

const offerList = async(req, res) => {
    const offer = await getAllOffer();
    res.send(offer);
}

const deletingOffer = async(req, res) => {
    const {umkmId = "662c9f7ecc5f468928a238fb"} = req.body
    const {offerId} = req.params;
    const deleteOff = await deleteOffer(umkmId, offerId);
    if(deleteOff.status !== 200){
        return res.send(deleteOff);
    }
    const token = await jwt.sign({user:deleteOff.umkm}, process.env.JWT, {expiresIn:'1h'});
    res.cookie('token', token, {signed:true});
    res.send(deleteOff);
}

module.exports = {offerList, deletingOffer};