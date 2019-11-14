const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique: true
    },
    phone :{
        type : String,
        required : true,
        unique:true
    },
    password :{
        type : String,
        required : true
    },
    etat : {
        type : Number,
        default : 0
    },
    role : {
        type : String,
        default : "user"
    },
    photo : {
        type : String
    }

})

const User = mongoose.model('user',userSchema);
module.exports={User};