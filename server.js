const express = require('express');
const connectDB = require('./src/DB'); // Asegúrate de que la ruta sea correcta

const app = express();

// Conectar a la base de datos
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});