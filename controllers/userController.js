const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multipart = require('connect-multiparty');
const fs = require('fs');

const { User } = require('./../models/user');
const { mongoose } = require('./../db/config');

const app = express();

const multipartMiddleWare = multipart({ uploadDir: './assets' });

app.post('/register', (req, res) => {
    // let age = req.params.age;
    let data = req.body;
    // console.log(data);
    // res.status(200).send('register success !');
    data._password = bcrypt.hashSync(data._password, 10);
    let user = new User({
        firstname: data._firstname,
        lastname: data._lastname,
        phone: data._phone,
        email: data._email,
        password: data._password
    });
    user.save().then((result) => {
        res.status(200).send({ message: 'utilisateur inseré avec succé !' })
    }).catch((error) => {
        let key = Object.keys(error.keyPattern)[0];

        res.status(400).send({ message: key })

    });
});

app.get('/profil/:idUser', (req, res) => {
    let _id = req.params.idUser;
    User.findOne({ _id }).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
})

app.post('/login', (req, res) => {
    // let age = req.params.age;
    let email = req.body._email;
    let password = req.body._password;

    User.findOne({ email }).then((result) => {
        console.log(result);
        if (!result) {
            res.status(404).send({ message: 'email incorrect!' })
        }
        let campare = bcrypt.compareSync(password, result.password);
        if (!campare) {
            res.status(404).send({ message: 'password incorrect!' });
        }
        if (result.etat == 0) {
            res.status(404).send({ message: 'your account not activated yet !' });
        }

        let token = jwt.sign({ idUser: result._id, roleUser: result.role }, 'mySecretKey');
        res.status(200).send({ token });
    }).catch((error) => {
        res.status(400).send(error);
    })

});

app.post('/activateUser/:idUser', (req, res) => {
    let _id = req.params.idUser;
    let etat = 1;
    User.findByIdAndUpdate({ _id }, { etat }).then(
        (result) => {
            console.log(result);
            res.status(200).send(result);
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(400).send(error);

        }
    );
});

app.post('/desactivateUser/:idUser', (req, res) => {
    let _id = req.params.idUser;
    let etat = 0;
    User.findByIdAndUpdate({ _id }, { etat }).then(
        (result) => {
            console.log(result);
            res.status(200).send(result);
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(400).send(error);
        }
    );
});

app.get('/list/:roleUser', (req, res) => {
    let roleUser = req.params.roleUser;
    if (roleUser == 'user') res.status(404).send({ message: "you don't have permission to access this resource !" });
    let role = 'user';
    User.find({ role }).then(
        (result) => {

            res.status(200).send(result);
        }
    ).catch(
        (error) => {
            res.status(400).send({ message: error });
        }
    );

});

app.delete('/delete/:idUser', (req, res) => {
    let _id = req.params.idUser;
    User.findByIdAndRemove({ _id }).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });

})

app.post('/update', multipartMiddleWare, (req, res) => {
    let data = JSON.parse(req.body.data);
    let image = req.files.image;
    if (image) {
        let type = image.type.substring(image.type.indexOf('/') + 1, image.type.length);
        let imgPath = "assets/" + data.id + '.' + type;
        fs.renameSync(image.path, imgPath);
        data.photo = data.id + '.' + type;
    }
    User.findByIdAndUpdate({ _id: data.id }, data).then((result) => {
        res.status(200).send({ message: 'user updated !' });
    }).catch((error) => {
        res.status(400).send(error);
    })
})


module.exports = app;