import express from 'express';
import { config } from 'dotenv';
//import socketIo from 'socket.io';
import { Server } from 'socket.io';
config();

const app = express();
const port = process.env.PORT || 3000;

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

});