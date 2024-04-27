const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    investorId:{
        type:mongoose.Schema.ObjectId,
        ref:'Investor'
    },
    umkmId:{
        type:mongoose.Schema.ObjectId,
        ref:'Umkm'
    },
    offerId:{
        type:mongoose.Schema.ObjectId,
        ref:'Offer'
    },
    transactionAmount:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:['Pending', 'Success', 'Failed'],
        default:'Pending'
    }
})