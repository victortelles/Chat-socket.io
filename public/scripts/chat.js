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
