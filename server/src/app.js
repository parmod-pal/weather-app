const path = require('path');
const express = require('express');
const app = express();
const {engine} = require('express-handlebars');


// Set Handlebars as view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const weatherRouter = require('./routes/weather');

app.use('/weather',weatherRouter);

app.get('/',weatherRouter); 


module.exports = app;