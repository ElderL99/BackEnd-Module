const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const createError = require('http-errors');
const { encrypt, compare } = require('../utils/encryption'); // Ajusta la ruta según la ubicación de encryption.js

const router = express.Router();

// Register
router.post('/signup', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password: encrypt(password) });
        await user.save();
        res.send({ message: 'User registered successfully' });
    } catch (error) {
        next(createError(500, 'Internal Server Error'));
    }
});

// Login
router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !compare(password, user.password)) {
            throw createError(401, 'Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        next(error);
    }
});

// Get user by ID
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw createError(404, 'User not found');
        }
        res.send(user);
    } catch (error) {
        next(error);
    }
});

// Delete user by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            throw createError(404, 'User not found');
        }
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;