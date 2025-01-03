import express from 'express';
import { config } from 'dotenv';
import path from 'path';
import routes from './routes';
//import socketIo from 'socket.io';
import { Server } from 'socket.io';

config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use('/', express.static(path.join(__dirname, '..', 'public')));

//establecer la ubicacion de vistas (html)
app.set('views', path.join(__dirname, 'views'));

// Configuración de archivos estáticos en el server.ts
app.use(express.static(path.join(process.cwd(), 'dist')));

// Middleware para parsear JSON
app.use(express.json());

//Importar rutas
app.use(routes)

//Importar el socket.io (server) (similar al "app.listen")
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//Crear instancia de Server de socket.io
const io = new Server(server);

io.on('connection', (socket) => {

    socket.on('joinRoom', (roomId) => {
        socket.join(`room-${roomId}`);
    });

    //Importar la funcionalidad del controlador.
    require('./controllers/chat.controller').sendMessage(io, socket);

});