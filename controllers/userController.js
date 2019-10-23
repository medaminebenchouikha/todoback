const express= require('express');
const app=express();

app.post('/register',(req,res)=>{
    // let age = req.params.age;
     let data = req.body;
     console.log(data);
     res.status(200).send('register success !');
 });

 app.post('/login',(req,res)=>{
    // let age = req.params.age;
     let data = req.body;
     console.log(data);
     res.status(200).send('login success !');
 });


 module.exports=app;