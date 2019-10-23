const express = require ('express');
const app= express();

app.get('/list',(req,res)=>{
    let data = req.body;
    console.log(data);
    res.status(200).send('todo list success !');
});

app.put('/add',(req,res)=>{
    let data = req.body;
    console.log(data);
    res.status(200).send('todo add success !');
});

app.patch('/update/:id',(req,res)=>{
    let id = req.params.id;
    res.status(200).send('update todo '+id);
});

app.delete('/delete/:id',(req,res)=>{
    let id = req.params.id;
    res.status(200).send('delete todo '+id);
});

module.exports=app;