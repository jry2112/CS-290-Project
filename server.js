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
const { response } = require('express');
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

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

// POST route from contact form
app.post('/contact', (req, res) => {

  // Instantiate the SMTP server
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "28f52f69f9e0a8",
      pass: "9131fe4b38f62d"
    },

  });

  // Specify what the email will look like
  const mailOpts = {
    from: `${req.body.email}`,
    to: 'user@example.com',
    subject: 'New message from contact form at DCNR1',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  }

  // Attempt to send the email
  transport.sendMail(mailOpts, (error, response) => {
    if (error) {
      return console.log(error);
    }
    else {
      res.send("Message Sent")
      
    }
  })
})



// port where app is served
app.listen(app.get('port'), () => {
    console.log('The web server has started on port ' + app.get('port'));
});
