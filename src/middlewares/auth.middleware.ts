import { Request, Response, NextFunction } from "express";

export const validateUsername = (req: Request, res: Response, next: NextFunction) => {
    const username = req.headers['username'] as string || req.body.username;

    if (username) {
        console.log(`Middleware: Usuario ${username} autenticado`);
        req.body.username = username;
        next();
    } else {
        console.log(`Middleware: ${username} No se recibió el username en la solicitud`);
        res.status(400).json({ message: 'Username is required' });
    }
}