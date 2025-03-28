import mysql from 'mysql2';
import { DB_NAME, DB_USER, DB_PORT, DB_PASSWORD, DB_HOST } from './config.js';

// configuracion de la copnexion a la base de datos
export const conexion = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT

}).promise();

// conexion a la base de datos
(async () => {
    try {
        await conexion.connect();
        console.log('Conexion a la base de datos exitosa');

    } catch (error) {
        console.log('Error al conectar a la base de datos', error);

    }

})();
