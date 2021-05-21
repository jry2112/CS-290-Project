var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

// Configure template Engine and Main Template File
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

// Setting the template Engine
app.set('view engine', '.hbs');

// routes
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/events', (req, res) => {
    res.render('events');
});
app.get('/store', (req, res) => {
    res.render('store');
});
app.get('/support', (req, res) => {
    res.render('support');
});

// port where app is served
app.listen(3000, () => {
    console.log('The web server has started on port 3000')
});