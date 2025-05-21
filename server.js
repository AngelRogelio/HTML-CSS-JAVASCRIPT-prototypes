const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./db');
const { personas } = require('./schema');
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para tu archivo main.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Main.html'));
});

// Crear persona
app.post('/guardar', async (req, res) => {
  const persona = req.body;
  console.log('Persona recibida:', persona);
  try {
    await db.insert(personas).values({
      nombre: persona.nombre,
      curp: persona.curp,
      telefono: persona.telefono,
      email: persona.email
    });
    res.json({ message: 'Texto guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar texto:', error);
    res.status(500).send({ message: 'Error al guardar texto' });
  }
});

// Obtener todas las personas
app.get('/obtener', async (req, res) => {
  try {
    const personasres = await db.select().from(personas);
    res.json(personasres);
  } catch (error) {
    console.error('Error al obtener textos:', error);
    res.status(500).send({ message: 'Error al obtener textos' });
  }
});

// Borrar persona
app.delete('/borrar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Usa solo el valor primitivo, no un objeto
    await db.delete(personas).where('id', Number(id));
    res.json({ message: 'Texto borrado correctamente' });
  } catch (error) {
    console.error('Error al borrar texto:', error);
    res.status(500).send({ message: 'Error al borrar texto' });
  }
});

// Actualizar persona
app.put('/actualizar/:id', async (req, res) => {
  const { id } = req.params;
  const persona = req.body;
  try {
    await db.update(personas)
      .set({
        nombre: persona.nombre,
        curp: persona.curp,
        telefono: persona.telefono,
        email: persona.email
      })
      .where({ id: id });
    res.json({ message: 'Texto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar texto:', error);
    res.status(500).send({ message: 'Error al actualizar texto' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});