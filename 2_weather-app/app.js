require('dotenv').config();
const request = require('postman-request');
const geocode = require('./utils/geocode');

// Weather Stack API
// document: https://weatherstack.com/documentation
// const WEATHER_STACK_URL = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_ACCESS_KEY}&query=${LATITUDE_LONGITUDE}&units=m`;

// request({ url: WEATHER_STACK_URL, json: true }, (error, response) => {
//     if (error) {
//         console.log(`Unable to connect weather service`);
//     } else if (response.body.error) {
//         console.log(`Unable to find location. ${response.body.error.info}`);
//     } else {
//         const data = response.body.current;
//         const { temperature, weather_descriptions, feelslike } = data;
//         console.log(`${weather_descriptions}. It's currently ${temperature} degrees. It feels like ${feelslike} degrees`);
//     }
// });

geocode('Tokyo', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
});