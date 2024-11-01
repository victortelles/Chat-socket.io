import { Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
import path from 'path';

//Funcion para Enviar mensaje a la sala especifica
export const sendMessage = (io: Server, socket: Socket) => {
    //Escuchar el evento, enviado desde el cliente
    socket.on('sendNewMessage', (data) => {
        console.log(`Mensaje Recibido en la sala ${data.room}: ${data.message}`);

        //Emitir el mensaje unicamente en la misma sala
        io.to(`room-${data.room}`).emit("messageReceived", data);
    });

    socket.on('joinRoom', (roomId) => {
        console.log(`Usuario conectado a la sala ${roomId}`);
        socket.join(`room-${roomId}`);
        //Notificar nuevo usuario a la sala.
        io.to(`room-${roomId}`).emit("newUserJoined", { message: "Nuevo usuario se unio a la sala", room: roomId });
    })
};

//Renderizar el archivo de la sala de chat especifico
export const getChatRoom = (req: Request, res: Response) => {
    //Envia el HTML
    res.sendFile(path.join(__dirname, '../views/chat.html'));
};
