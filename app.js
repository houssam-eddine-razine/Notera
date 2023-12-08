require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport =require('passport');
const MongoStore = require('connect-mongo');
const nodemailer = require("nodemailer");
const app = express();
const port = 5000 || process.env.PORT;

app.use(session({
    secret: 'change this',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: { maxAge: new Date ( Date.now()+ (3600000) )}
}));
//intialize
app.use(passport.initialize());
app.use(passport.session());
//help us pass data true pages ex(form) 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));


//vonnectdb
connectDB();
//Static Files
//link bir or html/js documants pics...
app.use(express.static('public'));

//Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes 
app.use('/', require('./server/routes/auth'));
//app.use('/', require('./server/routes/contact'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));
// handle 404
app.get('*', function(req, res){
    // or u can render a custom page .render
    //res.status(404).send('404 Page Not Found.')
    res.status(404).render('error');
})
app.listen(port, ()=> {
    console.log(`App listening on port ${port}`);

})


app.use(express.json())
app.get('/', (req, res)=>{
    re.sendFile(__dirname + '/public/contactform.html')
})
app.post('/', (req, res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'electrohoussamr@gmail.com',
            pass: 'athaecntfcutkplg'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'electrohoussamr@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }


    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})

