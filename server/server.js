import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './router/index.js';
import * as dotenv from 'dotenv';
import errorMiddleware from './middleware/error-middleware.js';
import * as http from 'http';
import { Server } from 'socket.io';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 4000,
  pingInterval: 2000,
  upgradeTimeout: 2000
});
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
//Middleware с ошибками должен всегда идти последним
app.use(errorMiddleware);

async function start() {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URL}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    server.listen(PORT, () => console.log(`listening on: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

io.on('connection', (socket) => {
  console.log(`${socket.client.id} connected`);

  socket.on('addMessage', (msg) => {
    io.emit('addMessage', `${msg}`);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.handshake.address} disconnected`);
  });
});

start();
