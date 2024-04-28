const mongoose = require('mongoose');

const umkmSchema = new mongoose.Schema({
    ownerName:{
        type:String,
        require:true
    },
    umkmName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    offering:{type:mongoose.Schema.ObjectId, ref:'Offer', default:null}
})

const Model = mongoose.model('Umkm', umkmSchema);

module.exports = Model;