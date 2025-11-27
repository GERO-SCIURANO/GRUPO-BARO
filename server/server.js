require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.post('/api/contact', async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, asunto, mensaje } = req.body || {};
    if (!email || !asunto || !mensaje) {
      return res.status(400).json({ ok: false, error: 'Falta email/asunto/mensaje.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `"Web Grupo Baro" <${process.env.GMAIL_USER}>`,
      to: process.env.TO_EMAIL || 'gerosciuri@gmail.com',
      subject: `Consulta: ${asunto}`,
      replyTo: email,
      text: `Nombre: ${nombre || ''} ${apellido || ''}
Teléfono: ${telefono || ''}
Email: ${email}

Mensaje:
${mensaje}
`
    });

    res.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'No se pudo enviar el correo.' });
  }
});

app.listen(PORT, () => console.log('Servidor en http://localhost:' + PORT));
