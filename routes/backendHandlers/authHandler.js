/*
 * File: authHandler.js
 * Project: crudserver
 * File Created: Saturday, 30th May 2020 1:07:06 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const jwt = require('jsonwebtoken');

function generateAuthToken(user) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || '1234567890';
    return new Promise((resolve, reject) => {
        jwt.sign(user, accessTokenSecret, { expiresIn: '10s' }, (err, accessToken) => {
            if (err) {
                // 'Error while generating accessToken'
                const errCode = 500;
                reject(errCode);
            }
            resolve(accessToken);
        });
    });
}


function validateAPICall(params) {
    const { Username, Password } = params;
    return new Promise((resolve, reject) => {
        if (!Username || !Password) {
            // 'Missing Keys in Request'
            const errCode1 = 400;
            reject(errCode1);
        }
        if (Username === 'admin' && Password === 'admin') {
            resolve(params);
        }
        // 'Invalid credentials'
        const errCode2 = 401;
        reject(errCode2);
    });
}

const entry = async (req, res) => {
    console.log(`Entry point of API call${JSON.stringify(req.body)}`);
    try {
        await validateAPICall(req.body);
        const authToken = await generateAuthToken(req.body);
        return res.json({ success: true, authToken });
    } catch (error) {
        console.log('error occurred');
        res.sendStatus(error);
    }
};


module.exports = {
    entry,
};
