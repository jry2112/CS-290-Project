var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
app.set('port', process.env.PORT || 3000 || 80);

var path = require('path');
var nodemailer = require('nodemailer');

var bodyParser = require('body-parser');
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

// wrapper for await
async function main() {
    // route for sending email through form using Nodemailer
    // Source --> https://tylerkrys.ca/blog/adding-nodemailer-email-contact-form-node-express-app
    app.post('/', (req, res) => {
        // Test email account
        let testAccount = await nodemailer.createTestAccount();

        // Create the SMTP transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        // Email specifics
        var mailOpts = {
            from: testAcount.user,
            to: testAccount.user,
            subject: 'New message from contact form at DCNR1',
            text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
        };

        // Attempt to send the email
        smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
                res.render('contact-failure') // Show a page indicating failure
            }
            else {
                res.render('contact-success') // show a page indicating success
            }
        });

        console.log("Message sent: %s", info.messageId);
        
        // Preview URL for Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }); 
}

main().catch(console.error);

// port where app is served
app.listen(app.get('port'), () => {
    console.log('The web server has started on port ' + app.get('port'));
});
