const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 4000;

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/public');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err){
            console.log('Unable to append the log');
        }
    });
    console.log(log);
    next();
});

/* 
app.use( (req, res, next) => {
    res.render('maintenance.hbs');
})
 */
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

app.get("/", (req, res) => {
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        welcomeMessage : 'This is home page message'
    });
});

app.listen(port, () => {
    console.log('We are live on port ', port);
});