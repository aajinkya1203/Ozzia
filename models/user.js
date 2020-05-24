const mongoose = require('mongoose');
var { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{
        type:ObjectId,
        ref:"User"
    }],
    following:[{
        type: ObjectId,
        ref:'User'
    }],
    photo:{
        type: String,
        default:"https://res.cloudinary.com/engima/image/upload/v1590309246/default_yotaqs.png"
    }
})

module.exports = mongoose.model("User",UserSchema);