const mongoose = require('mongoose');

const usr = "adanlugo";
const password = "Papasconqueso";
const clusterUrl = "kod-01.dwjstu1.mongodb.net";
const dbName = "Devto"; 

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${usr}:${password}@${clusterUrl}/${dbName}`);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        process.exit(1); 
    }
};

module.exports = connectDB;