import express from 'express';
import ENVIROMENT from './config/enviroment.js';
import cors from 'cors';

const app = express();
const PORT = ENVIROMENT.PORT;

console.log('Servidor arrancando...');

app.use(cors({
  origin: ENVIROMENT.URL_FRONTEND
}));
app.use(express.json());

import statusRoute from './routes/status.route.js';
import authRouter from './routes/auth.route.js';
import workspaceRouter from './routes/workspace.route.js';
import channelRouter from './routes/channel.route.js';

// Importa tu middleware de autenticación
import { authMiddleware } from './middlewares/auth.middleware.js';

app.use("/api/status", statusRoute);
app.use("/api/auth", authRouter);
app.use("/api/workspaces", authMiddleware, workspaceRouter); // Aplica el middleware de autenticación aquí
app.use("/api/channel", channelRouter);

app.get('/test', (req, res) => {
  res.send('El servidor está funcionando correctamente.');
});

app.listen(PORT, () => {    
  console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
});
