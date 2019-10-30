const express = require ('express');
const {Todo} = require('./../models/todo');
const {mongoose} = require('./../db/config');

const app= express();

app.get('/list',(req,res)=>{

    Todo.find().then((result)=>{
        console.log(result);
        res.status(200).send(result);

    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error);

    });
 
});

app.put('/add',(req,res)=>{
    let data = req.body;
    //console.log(data);
    //res.status(200).send('todo add success !');
    let todo = new Todo({
        description:data._description
    });
    todo.save().then((result)=>{
        res.status(200).send({message:'Todo added!'});
    }).catch((error)=>{
        res.status(400).send({message:error});
    });
});

app.patch('/update/:id',(req,res)=>{
    let id = req.params.id;
   // res.status(200).send('update todo '+id);
   Todo.find({_id:id}).then(
       (result)=>{
        console.log(result);
        res.status(200).send(result);
       }
   ).catch(
       (error)=>{
        console.log(error);
        res.status(400).send(error);
       }
   );
});

app.delete('/delete/:id',(req,res)=>{
    let id = req.params.id;
   // res.status(200).send('delete todo '+id);
   Todo.findByIdAndRemove({_id:id}).then(
       (result)=>{
        console.log(result);
        res.status(200).send({message:result});
       }
   ).catch(
       (error)=>{
        console.log(error);
        res.status(400).send({message:error});
       }
   );
});

module.exports=app;