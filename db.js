const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://trump5469:Hm7c88yBnfUyMtJF@cluster0.p8rps90.mongodb.net/hotel-mgt';

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true});

var connection = mongoose.connection;

connection.on('error', () => console.log('MongoDB connection failed'));
connection.on('connected', () => console.log('Connection Successful!'));

module.exports = mongoose;