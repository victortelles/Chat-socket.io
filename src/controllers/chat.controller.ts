import { Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
import path from 'path';

//Funcion para Enviar mensaje a la sala especifica
export const sendMessage = (io: Server, socket: Socket) => {
    //Escuchar el evento, enviado desde el cliente
    socket.on('sendNewMessage', (data) => {
        console.log(`Mensaje recibido de ${data.senderId} en la sala ${data.room}: ${data.message}`);

        //Emitir el mensaje unicamente en la misma sala
        io.to(`room-${data.room}`).emit("messageReceived", data);
    });

    //Usuario se une a la sala
    socket.on('joinRoom', (roomId, username) => {
        console.log(`Usuario ${username} se ha unido a la sala ${roomId}`);
        socket.join(`room-${roomId}`);

        //Notificar nuevo usuario a la sala.
        io.to(`room-${roomId}`).emit("newUserJoined", { message: `${username} se unio a la sala`, room: roomId });

        socket.on('disconnect', () => {
            console.log(`${username} se ha desconectado de la sala ${roomId}`);

            //Notificar que un usuario ha dejado la sala.
            io.to(`room-${roomId}`).emit("userDisconnected", {message: `${username} ha dejado la sala`, room: roomId});
        });
    });

};

//Renderizar el archivo de la sala de chat especifico
export const getChatRoom = (req: Request, res: Response) => {
    //Envia el HTML
    //produccion
    res.sendFile(path.join(process.cwd(), 'dist', 'views', 'chat.html'));
    //desarrollo
    //res.sendFile(path.join(__dirname,'../views/chat.html'));
};
