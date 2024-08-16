const mongoose = require('mongoose');

const usr = "adanlugo";
const password = "Papasconqueso";
const clusterUrl = "kod-01.dwjstu1.mongodb.net";
const dbName = "Devto"; // Reemplaza con el nombre de tu base de datos

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${usr}:${password}@${clusterUrl}/${dbName}`);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;