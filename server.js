const express = require('express');
const connectDB = require('./src/lib/DB'); // Asegúrate de que la ruta sea correcta
const getArg = require('./src/lib/getArg'); // Ajusta la ruta según la ubicación de getArg.js
const { sign, verify } = require('./src/lib/jwt'); // Ajusta la ruta según la ubicación de jwt.js

const app = express();

// Conectar a la base de datos
connectDB();

const PORT = getArg('PORT') || process.env.PORT || 5000;

// Middleware para verificar el token JWT
app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    try {
      req.user = verify(token);
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
});

// Ruta de ejemplo que requiere autenticación
app.get('/protected', (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});