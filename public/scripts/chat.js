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
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const message = messageInput.value;

    if (message.trim()) {
        //Envia mensaje al servidor (sala y Id user.remitente)
        socket.emit('sendNewMessage', { message, room: roomId, senderId: userId, timestamp });
        console.log(`(ID: ${roomId}, Mensaje: ${message})`);
        messageInput.value = '';    //Limpiar el campo despues de enviar
    }
});

//Escuchar nuevos mensajes recibidos del servidor y mostrarlos en el chat
socket.on('messageReceived', (data) => {
    displayMessage(data, false);
});

// Función para mostrar mensajes en el chat con estilos
function displayMessage(data, isOwnMessage) {
    //Crea un nuevo elemento (div)
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.textContent = data.message;

    //Aplica la clase de estilo segun el remitente.
    newMessage.classList.add(isOwnMessage || data.senderId === userId ? 'sent' : 'received');

    //Agregar el mensaje al contenedor.
    messagesContainer.appendChild(newMessage);
}