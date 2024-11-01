//test
console.log("Chat.js loaded");

//Conexion del cliente con el servidor de socket.io
const socket = io('/');

//referencias a elementos DOM
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messagesContainer');

//Obtener el ID de la sala desde URL
const roomId = window.location.href.split('/').pop();

//Cliente se une a una sala especifica desde url.
socket.emit('joinRoom', roomId);

//Referencia a un ID usuario temporal
const userId = `user-${Math.random().toString(36).substr(2, 9)}`;

//Manejar el envio de forms de mensajes
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //Hora
    const message = messageInput.value;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    if (message.trim()) {
        //Envia mensaje al servidor (sala y Id user.remitente)
        socket.emit('sendNewMessage', { message, room: roomId, senderId: userId, timestamp });
        console.log(`(ID: ${roomId}, Mensaje: ${message})`);
        messageInput.value = '';    //Limpiar el campo despues de enviar
    }
});

//Escuchar nuevos mensajes recibidos del servidor y mostrarlos en el chat
socket.on('messageReceived', (data) => {
    displayMessage(data, data.senderId === userId);
});

//Mensaje Notificacion de nuevo usuario
socket.on('newUserJoined', (data) => {
    displayNotification(data.message);
})

// Función para mostrar mensajes en el chat con estilos
function displayMessage(data, isOwnMessage) {
    //Crea un nuevo elemento (div)
    const newMessage = document.createElement('div');
    newMessage.classList.add('message', isOwnMessage ? 'sent' : 'received');

    const messageText = document.createElement('span');
    messageText.textContent = data.message;

    //Creacion de la hora (timestamp)
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = data.timestamp;

    //Estilo timestamp, si es propietario (derecha) si es remitente (izq)
    timestamp.style.alignSelf = isOwnMessage ? 'flex-end':'flex-start'

    //newMessage.textContent = data.message;

    //Aplica la clase de estilo segun el remitente.
    //newMessage.classList.add(isOwnMessage || data.senderId === userId ? 'sent' : 'received');

    //Agregar el mensaje al contenedor.
    newMessage.appendChild(messageText);
    newMessage.appendChild(timestamp);
    messagesContainer.appendChild(newMessage);
}

function displayNotification(message) {
    const displayNotification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = `- ${message} -`;
    messagesContainer.appendChild(notification);
}