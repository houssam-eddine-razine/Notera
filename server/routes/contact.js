/*var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');
const app = express();

app.get("/", function(req, response){
    response.sendFile(path.join(__dirname, "page/index.html"))
})

app.post("send_email", function(req, response){
    var from = req.main.from;
    var to = req.main.to;
    var subject = req.body.subject;
    var message = req.body.message;

    var transporte = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'electrohoussamr@gnmail.com',
            pass: 'R1A2Z3I4N5E6'
        }
    });

    var mailOptions ={
        from: from,
        to: to,
        subject: subject,
        text: message,

    }

    WebTransportError.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error)
        }else{
            console.log("Email Send: " + info.response)
        }
        response.redirect("/")
    })
})*/
//initialize webs server
