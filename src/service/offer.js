const Offer = require('../model/Offer');
const Umkm = require('../model/umkm')

const getAllOffer = async() => {
    const allOffer = await Offer.find();
    return allOffer;
}

const deleteOffer = async(umkmId, offerId) => {
    const umkm = await Umkm.findById(umkmId);
    const offer = await Offer.findById(offerId);
    if(!umkm && !offer){
        return {status:401, message:'identity not found'};
    }
    if(umkm.offering._id != offerId){
        console.log({umkmOffering:umkm.offering._id, offer:offer._id})
        return {status:401, message:'you have no authority to delete this offer'};
    }
    umkm.offering = null;
    await umkm.save();
    await Offer.findOneAndDelete(offer._id);
    return {status:200, message:'successfully delete offer', umkm};
}

module.exports = {getAllOffer, deleteOffer};