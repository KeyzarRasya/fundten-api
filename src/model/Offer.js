const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    umkmId:{type:mongoose.Schema.ObjectId, ref:"Umkm"},
    amount:{
        type:Number,
        require:true
    },
    offeringInvestor:[
        {type:mongoose.Schema.ObjectId, ref:"Investor", default:[]}
    ],
    totalFunded:{
        type:Number,
        default:0
    }
})

const Model = mongoose.model('Offer', offerSchema);