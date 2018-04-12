const express = require('express');
const hbs = require('hbs');

var app = express();
const fs = require('fs');


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method}  ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server.log');
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintainence.hbs');
// })

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Hello welcome to my brand new page"
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeMessage: "Hello welcome to my brand new page"
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Bad Request"
    })
})
app.listen(3000, () => {
    console.log("Server is running on Port 3000");
});