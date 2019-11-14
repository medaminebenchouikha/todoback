const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');

const userController = require('./controllers/userController');
const todoController = require('./controllers/todoController');


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('assets'));

app.use('/user',userController);
app.use('/todo',todoController);


app.listen(3000,()=>console.log('server started !'));
