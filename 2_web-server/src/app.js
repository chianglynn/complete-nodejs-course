const path = require('path');
const express = require('express');

const publicDirectoryPath = path.join(__dirname, '../public');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        text: 'Help text',
    });
});

app.get('/weather', (request, response) => {
    response.send('Weather page');
});

app.listen(3000, () => console.log('Server is up on port 3000'));