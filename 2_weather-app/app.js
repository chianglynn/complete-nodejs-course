const request = require('postman-request');
const ACCESS_KEY = '410c8bfafd6dfecde267b40543b53a1b';
const LATITUDE_LONGITUDE = '37.8267,-122.4233';
// API document: https://weatherstack.com/documentation
const url = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${LATITUDE_LONGITUDE}&units=m`;

request({ url, json: true }, (error, response) => {
    const data = response.body.current;
    const { temperature, weather_descriptions, feelslike } = data;
    console.log(`${weather_descriptions}. It's currently ${temperature} degrees. It feels like ${feelslike} degrees`);
});