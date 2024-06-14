const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');

const configMysql = {
    host: 'localhost',
    user: 'cief',
    password: '123456',
    database: 'worldsman'
}
const connMysql = mysql.createConnection(configMysql);
try {
    connMysql.connect();
    // console.log('Conectado');
} catch (error) {
    console.error('Ha sucedido un problema', error);
}



router.get('/', (req, res) => {
    
    res.render('index', {
        title: 'Home'
    
    });
})

router.get('/mainMenu', (req, res) => {
    res.render('mainMenu', {
        title: 'main'

    })    
})

router.get('/login', (req, res) =>{

    res.render('login', {
        title: 'login'
    })
})
router.get('/register', (req, res) =>{

    res.render('register', {
        title: 'register'
    })
})


router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const SELECT = `SELECT * FROM usuario WHERE correo = '${username}' AND password = '${password}'`;
    connMysql.query(SELECT, (err, result) => {  
        if(err) throw err;
        if(result.length > 0){
            res.redirect('/mainMenu')
        }else{
            res.redirect('/login')
        }
    })
})

router.post('/register', (req, res) => {
    const {name, lastname, email, password} = req.body;

    const INSERT = `INSERT INTO usuario (nombre, apellido, correo, password) VALUES ('${name}', '${lastname}', '${email}', '${password}')`;

    connMysql.query(INSERT, (err, result) => {
        if(err) throw err;
        res.redirect('/login')
    })


})


module.exports = router;