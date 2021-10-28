const socket = io();
const messageForm = document.getElementById('message-form');
const messageInput = messageForm.querySelector('input');

socket.on('message', message => console.log(message));

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value;
    socket.emit('sendMessage', message);
});