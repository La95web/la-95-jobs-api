import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/subscription', (req, res) => {
  const { name, lastname, email, phone } = req.body;

  console.log('Datos recibidos:', { name, lastname, email, phone });

  const qrData = `Nombre: ${name} ${lastname}\nEmail: ${email}\nTeléfono: ${phone}`;
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=300x300`;

  res.json({
    message: 'Suscripción simulada exitosamente',
    qrImage
  });
});

app.get('/api/plans', (_req, _res) => {
  return prisma.plan.findMany();
});

app.post('/api/driver', (req, res) => {
  const { name, lastname, email, phone } = req.body;

  console.log('Datos del conductor recibidos:', { name, lastname, email, phone });

  res.json({ success: true });
});

app.post('/api/dispatch', (req, res) => {
  const { name, lastname, email, phone } = req.body;

  console.log('Datos del conductor recibidos:', { name, lastname, email, phone });

  res.json({ success: true });
});

app.listen(4000, () => {
  console.log('Mock API corriendo en http://localhost:4000');
});

