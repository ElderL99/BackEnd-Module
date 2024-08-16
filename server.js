const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/devto', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Models
const User = require('./models/User');
const Article = require('./models/Article');

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/articles', require('./routes/articles'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});