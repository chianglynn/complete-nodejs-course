const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Someone',
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        name: 'Someone',
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        name: 'Someone',
        text: 'Help text',
    });
});

app.get('/weather', (request, response) => {
    response.send('Weather page');
});

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        message: 'Help aticle not found.',
        name: 'Someone',
    });
});

app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Someone',
    });
});

app.listen(3000, () => console.log('Server is up on port 3000'));