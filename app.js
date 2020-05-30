/*
 * File: app.js
 * Project: crudserver
 * File Created: Saturday, 30th May 2020 12:43:06 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const express = require('express');
const bodyParser = require('body-parser');
const normalRouter = require('./routes/index.js');

const port = process.env.port || 3000;

const app = express();
app.use(bodyParser.json());
app.use('/', normalRouter);

// server start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
