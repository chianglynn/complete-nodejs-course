const request = require('postman-request');

// mapbox API
// document: https://docs.mapbox.com/api/search/geocoding/
const geocode = (address, callback) => {
    const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/encodeURIComponent(${address}).json?access_token=${process.env.MAPBOX_ACCESS_TOKENS}&limit=1`;

    request({ url: MAPBOX_URL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect location service', undefined);
        } else if (response.body.message || !response.body.features[0]) {
            callback('Unable to find location.', undefined);
        } else {
            const { place_name, center } = response.body.features[0];
            const [longitude, latitude] = center;
            callback(undefined, { location: place_name, latitude, longitude });
        }
    });
};

module.exports = geocode;