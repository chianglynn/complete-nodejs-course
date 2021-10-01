require('dotenv').config();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if (!location) return console.log('Please enter a location.');

geocode(location, (error, { location, latitude, longitude } = {}) => {
    if (error) return console.log('Error', error);

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) return console.log('Error', error);

        console.log(location);
        console.log(forecastData);
    });
});