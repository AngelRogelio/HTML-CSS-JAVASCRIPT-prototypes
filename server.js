const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa cors
const { db } = require('./db');
const { personas } = require('./schema');
const dotenv = require("dotenv");

const app = express();
const path = require('path');
// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para tu archivo main.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Main.html'));
});

dotenv.config();


const port = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta para guardar un texto en la base de datos
app.post('/guardar', async (req, res) => {
  const persona = req.body;
  console.log('Persona recibida:', persona);

  try {
    await db.insert(personas).values({ nombre:persona.nombre, curp:persona.curp, telefono:persona.telefono, email:persona.email}); // Ajusta según tu ORM o base de datos
    res.json({ message: 'Texto guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar texto:', error);
    res.status(500).send({ message: 'Error al guardar texto' });
  }
});
// Ruta para obtener todos los textos de la base de datos
app.get('/obtener', async (req, res) => {
  try {
    const personasres = await db.select().from(personas);
    res.json(personasres);
  } catch (error) {
    console.error('Error al obtener textos:', error);
    res.status(500).send({ message: 'Error al obtener textos' });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});