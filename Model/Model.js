const mongoose = require('mongoose')

const ezyskills_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    rollnumber:{
        type:Number,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    admission_date:{
        type:Date,
        default:Date.now()
    }
})

const Model = mongoose.model('ezySkill' , ezyskills_Schema)

module.exports = Model