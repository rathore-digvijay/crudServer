/*
 * File: app.js
 * Project: crudserver
 * File Created: Saturday, 30th May 2020 12:43:06 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const express = require('express');

const app = express();

const port = 3000;


app.get('/', (req, res) => {
    res.json({ success: true, info: 'Server started successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
