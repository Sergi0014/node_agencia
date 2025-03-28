import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import agenciaRouter from './routers/agencia.routes.js';



const app = express();
app.use(cors());
app.use(express.json());

app.use(agenciaRouter);

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto', PORT);
});