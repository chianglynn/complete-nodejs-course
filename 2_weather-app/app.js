require('dotenv').config();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if (!location) return console.log('Please enter a location.');

geocode(location, (error, geoData) => {
    if (error) return console.log('Error', error);

    forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
        if (error) return console.log('Error', error);

        console.log(geoData.location);
        console.log(forecastData);
    });
});