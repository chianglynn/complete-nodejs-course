const socket = io();
const messageForm = document.getElementById('message-form');
const messageInput = messageForm.querySelector('input');
const sendLocation = document.getElementById('send-location');


socket.on('message', message => console.log(message));

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value;
    socket.emit('sendMessage', message, (error) => {
        if (error) console.log(error);
        console.log('Message was delivered.');
    });
});
sendLocation.addEventListener('click', () => {
    if (!navigator.geolocation) return alert('Geolocation is not supported by your browser.');

    navigator.geolocation.getCurrentPosition(position => {
        sendLocation.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }, () => {
            console.log('Location shared.');
        });
    });
});