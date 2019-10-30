const mongoose= require('mongoose');

const todoSchema = mongoose.Schema({
    description :{
        type : String,
        required : true
    }
});

const Todo = mongoose.model('todo',todoSchema);

module.exports = {Todo};