var app = angular.module('makmurSehat', []); // AngularJS

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./authentication.js');

const expressApp = express(); // Express.js

// Middleware
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
expressApp.use(express.static('views'));

// Routes
expressApp.use('/api', authRoutes);

// Jalankan server
const PORT = 3002;
expressApp.listen(PORT, () => {
    console.log(`Server berjalan di http://127.0.0.1:${PORT}`);
});
