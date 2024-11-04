
# Chat en Tiempo Real con Socket.io
## Tecnologías de Desarrollo en el Cliente (O2024_ESI3943E)

## Objetivo
Crear un chat en línea que permita la comunicación en tiempo real mediante Socket.io.

## Descripción
Este proyecto consiste en el desarrollo de un chat en tiempo real donde los usuarios pueden enviar y recibir mensajes instantáneamente. Las características del chat incluyen:

- Autenticación por nombre de usuario.
- Selección de una sala de chat antes de iniciar la conversación.
- Burbujas de mensajes diferenciadas según el remitente (usuario o terceros).
- Notificación de eventos como ingreso y salida de usuarios en la sala de chat.

Cada mensaje muestra el nombre del usuario, la Hora y el contenido del mensaje. La aplicación escucha eventos en tiempo real para actualizar la interfaz al recibir mensajes de otros usuarios.

## Pre-Instalación de Tecnologías
Es necesario tener instaladas las siguientes tecnologías en el sistema:

- **Node.js**: [Instalación de Node.js](https://nodejs.org/en/download), versión 16 o superior.
- **Gulp**: Para compilar y gestionar tareas.
- **TypeScript**: Lenguaje de desarrollo.
- **Socket.io**: Biblioteca de comunicación en tiempo real.

## Librerías Utilizadas
- **Express**: Para gestionar el servidor web.
- **Socket.io**: Proporciona la comunicación en tiempo real para el chat.
- **Gulp**: Para tareas de construcción y automatización.
- **TypeScript**: Permite el desarrollo tipado y mejora la mantenibilidad.
- **Nodemon**: Para reiniciar el servidor automáticamente durante el desarrollo.
- **Dotenv**: Manejo de variables de entorno.

## Instrucciones para la Instalación

1. **Clonar el repositorio**
   Clona el repositorio a tu máquina local para obtener el código fuente del proyecto.

2. **Instalar Dependencias**
   Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las dependencias necesarias.
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**
   Crea un archivo `.env` en la raíz del proyecto para almacenar las configuraciones de entorno. Asegúrate de definir las variables necesarias para la configuración de tu servidor y entorno de Socket.io.
   ```bash
   PORT=
   ```

4. **Compilar el Proyecto**
   Compila el proyecto usando el comando de Gulp para generar el build:
   ````bash
   npm run build
   ```

5. **Ejecutar el Proyecto**
   Compila el proyecto usando el comando de Gulp para generar el build:
   ````bash
   npm run start
   ```

6. **Despliegue en Producción (automatizado)**
   Para instalar todo de uno es con el siguiente comando, lo que hace es: (Instalaccion de dependencias, Compilacion del proyecto y ejecucion del proyecto)
   ```
   npm run prod
   ```

7. **Iniciar el Servidor en Modo Desarrollo (Opcional)**
   Para ejecutar el servidor en modo de desarrollo y observar cambios en tiempo real.
   Tendras que modificar los siguientes archivos

    Dentro de `src/controllers/index.controller.ts` Descomenta y comenta la linea que dice desarrollo.
    ```bash
    //produccion
    //const indexPath = path.join(process.cwd(), 'dist', 'views', 'index.html');

    //desarrollo
    const indexPath = path.join(__dirname, '..', 'views', 'index.html');
    ```
    asi tiene que quedar.

    Dentro de `src/controllers/chat.controller.ts` Descomenta y comenta la linea que dice desarrollo.
    ```bash
    //produccion
    //res.sendFile(path.join(process.cwd(), 'dist', 'views', 'chat.html'));

    //desarrollo
    res.sendFile(path.join(__dirname, '../views/chat.html'));
    ```
    asi tiene que quedar.

    Dentro de `tsconfig.json` Modifica lo siguiente.
    ```bash
    //tsconfig.json para Desarrollo
    {
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
    }
    //tsconfig.json para produccion
    {
        "module": "CommonJS",
        "moduleResolution": "Node",
    }
    ```
    y despues usa el comando en la consola:
    ```bash
    npm run dev
    ```