const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: "Anand",
    //     age: 25,
    //     test: true
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomMessage: "Hello welcome to my brand new page"
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
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