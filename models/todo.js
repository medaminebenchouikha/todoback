const mongoose= require('mongoose');

const todoSchema = mongoose.Schema({
    description :{
        type : String,
        required : true
    },
    dateAjout:{
        type: Date,
        default : new Date()
    },
    dateFin:{
        type: Date,
        default : null
    },
    etat : {
        type:Boolean,
        default: false
    },
    idUser : {
        type:String,
        required:true
    }
});

const Todo = mongoose.model('todo',todoSchema);

module.exports = {Todo};