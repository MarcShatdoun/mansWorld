const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express(); 

const router = require('./router');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
})