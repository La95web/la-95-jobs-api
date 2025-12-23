import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './.env.local' });
}

import cors from 'cors'; 
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

const app = express();

app.use(cors());

app.use(express.json());

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

app.get('/comments', async (_req, res) => { 
  const comments = await prisma.comment.findMany();
  res.json(comments);
});

// new posts

app.post('/comments', async (req, res) => {
  const { name, email, comment } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: { name, email, content: comment, likes:0, hearts:0, fires:0 }
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo registrar el comentario.' });
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

    res.json(updateComment);
  } catch (error){
    res.status(404).json({error: 'No se pudo actualizar la reacción.' })
  }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3001');
});
