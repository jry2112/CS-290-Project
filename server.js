var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var app = express();
app.set('port', process.env.PORT || 3000 || 80);

// Configure template Engine and Main Template File
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

// Setting the template Engine
app.set('view engine', '.hbs');

// Get style and source files
app.use(express.static(path.join(__dirname, 'public')));



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
app.listen(app.get('port'), () => {
    console.log('The web server has started on port ' + app.get('port'));
});
