const request = require('postman-request');

// mapbox API
// document: https://docs.mapbox.com/api/search/geocoding/
const ACCESS_TOKENS = '';
const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${ACCESS_TOKENS}&limit=1`;

request({ url: MAPBOX_URL, json: true }, (error, response) => {
    if (error) {
        console.log(`Unable to connect location service`);
    } else if (response.body.message || !response.body.features[0]) {
        console.log(`Unable to find location.`);
    } else {
        const { place_name, center } = response.body.features[0];
        const [longitude, latitude] = center;
        console.log(`latitude: ${latitude}, longitude: ${longitude}`);
    }
});

// Weather Stack API
// document: https://weatherstack.com/documentation
const ACCESS_KEY = '';
const LATITUDE_LONGITUDE = '37.8267,-122.4233';
const WEATHER_STACK_URL = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${LATITUDE_LONGITUDE}&units=m`;

request({ url: WEATHER_STACK_URL, json: true }, (error, response) => {
    if (error) {
        console.log(`Unable to connect weather service`);
    } else if (response.body.error) {
        console.log(`Unable to find location. ${response.body.error.info}`);
    } else {
        const data = response.body.current;
        const { temperature, weather_descriptions, feelslike } = data;
        console.log(`${weather_descriptions}. It's currently ${temperature} degrees. It feels like ${feelslike} degrees`);
    }
});