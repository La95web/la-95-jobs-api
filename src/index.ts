import cookieParser from "cookie-parser";
import passport from "./auth/google";
import authRoutes from "./routes/auth.routes";
import { auth } from "./auth/middleware";

import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './.env.local' });
}

import { createServer } from 'http';
import { Server } from 'socket.io';


import cors from 'cors'; 
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

const app = express();

app.use(cors({
  origin: "http://localhost:5500",
  credentials: true
}));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST']
  }
});
app.use(express.json());

app.use(cookieParser());
app.use(passport.initialize());
app.use("/auth", authRoutes);

app.get('/userDrivers', async (_req, res) => {
  const drivers = await prisma.userDrivers.findMany();
  res.json(drivers);
});

// new posts
app.post('/userDrivers', async (req, res) => {
  const { name, lastName, phone, email } = req.body;

  try {
    const newDriver = await prisma.userDrivers.create({
      data: { name, lastName, phone, email }
    });
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo registrar el conductor.' });
  }
});

app.get('/userDispatch', async (_req, res) => {
  const dispatches = await prisma.userDispatch.findMany();
  res.json(dispatches);
});

// new posts
app.post('/userDispatch', async (req, res) => {
  const { name, lastName, phone, email } = req.body;

  try {
    const newDispatch = await prisma.userDispatch.create({
      data: { name, lastName, phone, email }
    });
    res.status(201).json(newDispatch);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo registrar el despachador.' });
  }
});

app.get('/userOperator', async (_req, res) => {
  const operators = await prisma.userOperator.findMany();
  res.json(operators);
});

// new posts
app.post('/userOperator', async (req, res) => {
  const { name, lastName, phone, email } = req.body;

  try {
    const newOperator = await prisma.userOperator.create({
      data: { name, lastName, phone, email }
    });
    res.status(201).json(newOperator);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo registrar el operador.' });
  }
});

app.get('/userRealState', async (_req, res) => {  
  const realStates = await prisma.userRealState.findMany();
  res.json(realStates);
});

// new posts
app.post('/userRealState', async (req, res) => {
  const { name, lastName, phone, email } = req.body;

  try {
    const newRealState = await prisma.userRealState.create({
      data: { name, lastName, phone, email }
    });
    res.status(201).json(newRealState);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo registrar la inmobiliaria.' });
  }
});

app.get('/userOther', async (_req, res) => { 
  const others = await prisma.userOther.findMany();
  res.json(others);
});

// new posts
app.post('/userOther', async (req, res) => {
  const { name, lastName, phone, email } = req.body;

  try {
    const newOther = await prisma.userOther.create({
      data: { name, lastName, phone, email }
    });
    res.status(201).json(newOther);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo registrar el otro tipo de usuario.' });
  }
});

app.get('/truckBuyer', async (_req, res) => { 
  const truckBuyers = await prisma.truckBuyer.findMany();
  res.json(truckBuyers);
});

// new posts
app.post('/truckBuyer', async (req, res) => {
  const { name, lastName, phone, email } = req.body;

  try {
    const newTruckBuyer = await prisma.truckBuyer.create({
      data: { name, lastName, phone, email }
    });
    res.status(201).json(newTruckBuyer);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo registrar el comprador de camiones.' });
  }
});
// lisent comments
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('newComment', (comment) => {
    io.emit('newComment', comment);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/comments', async (_req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  res.json(comments);
});

// new posts

app.post('/comments', auth, async (req, res) => {
  const { comment } = req.body;

  try {
    const userId = (req as any).user.id;

    const newComment = await prisma.comment.create({
      data: {
        content: comment,
        userId: userId
      },
      include: {
        user: true
      }
    });

    io.emit('newComment', newComment);

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'No se pudo registrar el comentario.' });
  }
});

app.delete('/comments/:id', auth, async (req, res) => {
  const commentId = Number(req.params.id);
  const userId = (req as any).user.id;

  try {
    // 1. Buscar el comentario
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    // 2. Verificar que el comentario pertenece al usuario autenticado
    if (comment.userId !== userId) {
      return res.status(403).json({ error: "No tienes permiso para eliminar este comentario" });
    }

    // 3. Eliminar el comentario
    await prisma.comment.delete({
      where: { id: commentId }
    });

    // 4. Emitir evento en tiempo real
    io.emit("commentDeleted", commentId);

    res.json({ success: true, id: commentId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando comentario" });
  }
});

app.patch('/comments/:id/reaction', async (req, res)=> {
  const {id} = req.params;
  const {type} = req.body;

  try {
    let data = {};
    if (type === 'like') data = {likes: {increment: 1}};
    if(type === 'heart') data = {hearts: {increment: 1}};
    if(type === 'fire') data = {fires: {increment: 1}};
    const updateComment = await prisma.comment.update({
      where: {id: parseInt(id)},
      data
    });

    io.emit('updateComment', updateComment);

    res.json(updateComment);
  } catch (error){
    res.status(404).json({error: 'No se pudo actualizar la reacción.' })
  }
})

app.get("/auth/me", auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: (req as any).user.id },
  });

  res.json(user);
});

app.post("/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Sesión cerrada" });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
