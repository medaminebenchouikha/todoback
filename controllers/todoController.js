const express = require ('express');
const {Todo} = require('./../models/todo');
const {mongoose} = require('./../db/config');

const app= express();

app.get('/list/:idUser',(req,res)=>{
    let idUser=req.params.idUser;
    Todo.find({idUser:idUser}).then((result)=>{
        let todoList=[];
        let doneList=[];
        for (let index = 0; index < result.length; index++) {
         if (result[index].etat==false) {
             todoList.push(result[index]);
         } else {
             doneList.push(result[index]); 
         }
            
        }
        console.log(result);
        res.status(200).send({todoList,doneList});

    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error);

    });
 
});

app.post('/add',(req,res)=>{
    let data = req.body;
    //console.log(data);
    //res.status(200).send('todo add success !');
    let todo = new Todo({
        description:data._description,
        idUser:data._idUser
    });
    todo.save().then((result)=>{
        res.status(200).send({message:'Todo added!'});
    }).catch((error)=>{
        res.status(400).send({message:error});
    });
});
app.patch('/updatedone/:id',(req,res)=>{
    let id= req.params.id;
    let _id=id;
    let update = {etat:true,dateFin:new Date()};
    Todo.findByIdAndUpdate({_id},update).then(
        (result)=>{
            console.log(result);
            res.status(200).send(result);
        }
    ).catch(
        (error)=>{
            console.log(result);
            res.status(400).send(result);
        }
    );
})
app.patch('/update/:id',(req,res)=>{
    let _id = req.params.id;
    let description = req.body._description;
   // res.status(200).send('update todo '+id);
    

   Todo.findByIdAndUpdate({_id},{description}).then(
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