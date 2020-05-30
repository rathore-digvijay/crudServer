/*
 * File: index.js
 * Project: crudserver
 * File Created: Saturday, 30th May 2020 12:58:33 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */
const express = require('express');
const authHandler = require('./backendHandlers/authHandler.js');
const fileHandler = require('./backendHandlers/configFileHandler.js');

const router = express.Router();

/**
 * This method is created here so that it can be used as middleware function.
 * This method verify the auth token if verified calls next function, if not then pass
 * failure reponse accordingly.
 * @author Digvijay Rathore
 * @param {Object} req Request Object
 * @param {Object} res Response Object instance
 * @param {Function} next Callabck function
 */
async function authMiddleware(req, res, next) {
    const tokenCheckData = await authHandler.verifyToken(req);

    if (tokenCheckData.success) {
        req.user = tokenCheckData.user;
        return next();
    }
    return res.sendStatus(tokenCheckData.statusCode);
}


// Home API
router.get('/', (req, res) => {
    res.json({ success: true, info: 'Server started successfully' });
});

// Auth API
router.post('/getAuthToken', (req, res) => {
    authHandler.entry(req, res);
});

// Create File API
router.post('/createConfigFile', authMiddleware, (req, res) => {
    fileHandler.createConfigFile(req, res);
});

// Read File API
router.get('/readConfigFile', authMiddleware, (req, res) => {
    fileHandler.getFileDetails(req, res);
});

router.put('/updateConfigFile', authMiddleware, (req, res) => {

});

router.delete('/deleteConfigFile', authMiddleware, (req, res) => {
    fileHandler.deleteConfigFile(req, res);
});

module.exports = router;
