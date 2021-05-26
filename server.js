var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
app.set('port', process.env.PORT || 3000 || 80);

var path = require('path');
var nodemailer = require('nodemailer');

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
const https = require('https');

var bodyParser = require('body-parser');
const { resolveSoa } = require('dns');
app.use(express.urlencoded({extended: true}));

// Configure template Engine and Main Template File
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

// Setting the template Engine
app.set('view engine', '.hbs');

// Get style and source files
app.use(express.static(path.join(__dirname, 'public')));


// routes for pages
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



// route for sending email through form using Nodemailer
// Source --> https://tylerkrys.ca/blog/adding-nodemailer-email-contact-form-node-express-app
app.post('/', function(req, res, next) {
    // Create transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'leif.pagac79@ethereal.email',
            pass: 'buPZkpAX1JDxJtmxsx'
        },
        tls: {
            rejectUnauthorized: false
        }
    }); 
    
    // Create message object
    const mailOptions = {
      from: `${req.body.email}`,
      to: 'leif.pagac79@ethereal.email',
      subject: `${req.body.name}`,
      text: `${req.body.message}`,
      replyTo: `${req.body.email}`
    }
    
    console.log('sending message')
    // Send message 
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('there was an error: ', err);
        return console.log(error)
      } else {
        res.render('post', 'Message sent successfully');
      };;
    });
    
  });



// port where app is served
app.listen(app.get('port'), () => {
    console.log('The web server has started on port ' + app.get('port'));
});
