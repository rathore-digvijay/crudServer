/*
 * File: index.js
 * Project: crudserver
 * File Created: Saturday, 30th May 2020 12:58:33 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */
const express = require('express');
const authHandler = require('./backendHandlers/authHandler.js');

const router = express.Router();

// Home API
router.get('/', (req, res) => {
    res.json({ success: true, info: 'Server started successfully' });
});

router.post('/getAuthToken', (req, res) => {
    authHandler.entry(req, res);
});

module.exports = router;
