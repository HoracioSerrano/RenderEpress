const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000; // Render define el puerto por variable de entorno

try {
const path = require('node:path');
const ruta = path.resolve(__dirname, "public");
app.use('/public', express.static(ruta)); // Para servir archivos estáticos
}catch{}

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando en Render!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});