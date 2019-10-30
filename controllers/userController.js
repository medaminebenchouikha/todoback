const express= require('express');
const bcrypt= require('bcrypt');
const jwt =require('jsonwebtoken');

const {User} = require('./../models/user');
const {mongoose} = require('./../db/config');

const app=express();

app.post('/register',(req,res)=>{
    // let age = req.params.age;
     let data = req.body;
    // console.log(data);
    // res.status(200).send('register success !');
    data._password=bcrypt.hashSync(data._password,10);
    let user = new User({
        firstname:data._firstname,
        lastname:data._lastname,
        phone:data._phone,
        email:data._email,
        password:data._password
    });
    user.save().then((result)=>{
        res.status(200).send({message:'utilisateur inseré avec succé !'})
    }).catch((error)=>{
        let key = Object.keys(error.keyPattern)[0];
       
        res.status(400).send({message:key+" existant!"})
       
    });
 });


 app.post('/login',(req,res)=>{
    // let age = req.params.age;
     let email = req.body._email;
     let password=req.body._password;

     User.findOne({email}).then((result)=>{
         console.log(result);
        if(!result){
            res.status(404).send({message:'email incorrect!'})
        }
        let campare = bcrypt.compareSync(password,result.password);
        if(!campare){
            res.status(404).send({message:'password incorrect!'});
        }
        let token = jwt.sign({idUser:result._id},'mySecretKey');
        res.status(200).send({token});
     }).catch((error)=>{
        res.status(400).send(error)
     })
    
 });


 module.exports=app;