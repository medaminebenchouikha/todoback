const express = require('express');
const app = express();

app.get('/list',(req,res)=>{
    let data = req.body;
    console.log(data);
    res.status(200).send('done list success !');
});

app.put('/add',(req,res)=>{
    let data = req.body;
    console.log(data);
    res.status(200).send('donne add success !');
});

app.patch('/update/:id',(req,res)=>{
    let id = req.params.id;
    res.status(200).send('update done '+id);
});

app.delete('/delete/:id',(req,res)=>{
    let id = req.params.id;
    res.status(200).send('delete done '+id);
});

module.exports=app;