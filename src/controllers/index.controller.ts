import { Request, Response } from 'express';
import path from 'path';

//Renderizar la pagina index.html
export const renderIndex = (req: Request, res: Response): void => {
    // Construye al archivo index.html
    //produccion
    const indexPath = path.join(process.cwd(), 'dist', 'views', 'index.html');

    //desarrollo
    //const indexPath = path.join(__dirname, '..', 'views', 'index.html');
    res.sendFile(indexPath);
};
