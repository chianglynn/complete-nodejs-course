require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

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
        name: 'Lynn Chiang',
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        name: 'Lynn Chiang',
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        name: 'Lynn Chiang',
        text: 'Help text',
    });
});

app.get('/weather', (request, response) => {
    if (!request.query.address) return response.send({
        error: 'Please enter a address',
    });

    geocode(request.query.address, (error, { location, latitude, longitude } = {}) => {
        if (error) return response.send({ error });

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return response.send({ error });

            response.send({
                address: request.query.address,
                location,
                forecast: forecastData,
            });
        });
    });
});

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        message: 'Help aticle not found.',
        name: 'Lynn Chiang',
    });
});

app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Lynn Chiang',
    });
});

app.listen(port, () => console.log(`Server is up on port ${port}.`));