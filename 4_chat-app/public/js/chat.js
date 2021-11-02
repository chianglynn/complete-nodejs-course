const socket = io();
const messages = document.getElementById('messages');
const messageTemplate = document.getElementById('message-template').innerHTML;
const locationMessageTemplate = document.getElementById('location-message-template').innerHTML;
const messageForm = document.getElementById('message-form');
const messageInput = messageForm.querySelector('input');
const messageButton = messageForm.querySelector('button');
const sendLocationButton = document.getElementById('send-location');

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.on('message', message => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('hh:mm a'),
    });
    messages.insertAdjacentHTML('beforeend', html);
});
socket.on('locationMessage', message => {
    console.log(message);
    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('hh:mm a'),
    });
    messages.insertAdjacentHTML('beforeend', html);
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Disable form button
    messageButton.setAttribute('disabled', 'disabled');

    const message = messageInput.value;

    socket.emit('sendMessage', message, (error) => {
        // Enable form button
        messageButton.removeAttribute('disabled');
        messageInput.value = '';
        messageInput.focus();

        if (error) console.log(error);
        console.log('Message was delivered.');
    });
});
sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) return alert('Geolocation is not supported by your browser.');

    sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(position => {
        sendLocationButton.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }, () => {
            sendLocationButton.removeAttribute('disabled');
            console.log('Location shared.');
        });
    });
});

socket.emit('join', { username, room }, error => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});