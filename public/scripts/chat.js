//test
console.log("********* Chat.js está cargado correctamente *********");


//Conexion del cliente con el servidor de socket.io
const socket = io('/');

//referencias a elementos DOM
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messagesContainer');

//Obtener el nombre de usuario desde la localstorage
const username = localStorage.getItem("username" || `user-${Math.random.toString(36).substr(2, 9)}`)
localStorage.setItem("username", username);

//Obtener el ID de la sala desde URL
const roomId = window.location.href.split('/').pop();

//Cliente se une a una sala especifica desde url.
socket.emit('joinRoom', roomId, username);
console.log(`${username} se ha unido a la sala ${roomId}`);

//Manejar el envio de forms de mensajes
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = messageInput.value.trim();

    if (message) {
        //Hora
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        //Envia mensaje al servidor (sala y Id user.remitente)
        socket.emit('sendNewMessage', { message, room: roomId, senderId: username, timestamp });
        console.log(`Mensaje Enviado por ${username} en la sala ${roomId}: ${message}`);
        messageInput.value = '';    //Limpiar el campo despues de enviar
    }
});

//Escuchar nuevos mensajes recibidos del servidor y mostrarlos en el chat
socket.on('messageReceived', (data) => {
    displayMessage(data, data.senderId === username);
    console.log(`Mensaje recibido de ${data.senderId} en la sala ${roomId}: ${data.message}`);
});

//Notificacion de usuario [Conectado || Desconectado]
socket.on('newUserJoined', (data) => {
    //Mostrar mensaje que se unio
    displayNotification(`${data.message}`);
    console.log(data.message);
});

socket.on('userDisconnected', (data) => {
    //Mostrar mensaje que se desconecto
    displayNotification(`${data.message}`);
    console.log(`${data.message}`);
});

//Funcion para hacer que el scroll se vaya para abjo
function scrollToBottom() {
    const messagesContainer = document.getElementById("messagesContainer");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Función para mostrar mensajes con el contenido en el chat
function displayMessage(data, isOwnMessage) {
    //Crea un nuevo elemento (div)
    const newMessage = document.createElement('div');
    newMessage.classList.add('message', isOwnMessage ? 'sent' : 'received');

    //Crear elemento para el autor del msj
    const messageAuthor = document.createElement('div');
    //Estilo
    messageAuthor.classList.add('username', isOwnMessage ? 'username-sent' : 'username-received');
    messageAuthor.textContent = data.senderId;

    //Elemento para el texto del mensaje
    const messageText = document.createElement('span');
    messageText.textContent = data.message;

    //Creacion de la hora (timestamp)
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = data.timestamp;
    //Estilo timestamp, si es propietario (derecha) si es remitente (izq)
    timestamp.style.alignSelf = isOwnMessage ? 'flex-end':'flex-start'

    //Agregar el mensaje al contenedor.
    newMessage.appendChild(messageAuthor);
    newMessage.appendChild(messageText);
    newMessage.appendChild(timestamp);
    messagesContainer.appendChild(newMessage);

    scrollToBottom();
}

//funcion para mostrar notificaciones
function displayNotification(message) {
    const joinNotification = document.createElement('div');
    joinNotification.classList.add('notification');
    joinNotification.textContent = `- ${message} -`;
    messagesContainer.appendChild(joinNotification);
}


//Boton de regresar
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
    window.location.href = '/'
});