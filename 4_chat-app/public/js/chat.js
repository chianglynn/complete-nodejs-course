const socket = io();
const messageForm = document.getElementById('message-form');
const messageInput = messageForm.querySelector('input');
const messageButton = messageForm.querySelector('button');
const sendLocationButton = document.getElementById('send-location');


socket.on('message', message => console.log(message));

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