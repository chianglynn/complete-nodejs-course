const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    // Weather Stack API
    // document: https://weatherstack.com/documentation
    const WEATHER_STACK_URL = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_ACCESS_KEY}&query=${latitude},${longitude}&units=m`;

    request({ url: WEATHER_STACK_URL, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect weather service.', undefined);
        } else if (body.error) {
            callback(`Unable to find location. ${body.error.info}`, undefined);
        } else {
            const data = body.current;
            const { temperature, weather_descriptions, feelslike } = data;
            callback(undefined, `${weather_descriptions}. It's currently ${temperature} degrees. It feels like ${feelslike} degrees.`);
        }
    });
};

module.exports = forecast;