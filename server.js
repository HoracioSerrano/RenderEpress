import express from 'express';
import path from 'node:path';
import pkg from 'pg'; // driver PostgreSQL

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 10000; // Render define el puerto por variable de entorno

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando en Render!, Con un cambio en el REPO!!!');
});

// Config Archivos Estáticos
const ruta = path.resolve('public');
app.use('/public', express.static(ruta)); // Para servir archivos estáticos

// Config PostgreSQL (Neon)
const pool = new Pool({
  host: 'ep-winter-river-a4f3dg3r-pooler.us-east-1.aws.neon.tech',
  database: 'verceldb',
  user: 'default',
  password: 't2Ju3hkoAQYE',
  ssl: { rejectUnauthorized: false }, // Neon requiere SSL
});

// Ruta SQL: listar tablas
app.get('/sql', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE';
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error ejecutando consulta:', err);
    res.status(500).send('Error en la consulta SQL');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
