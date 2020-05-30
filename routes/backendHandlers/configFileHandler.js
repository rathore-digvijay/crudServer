/*
 * File: configFileHandler.js
 * Project: crudserver
 * File Created: Saturday, 30th May 2020 2:23:58 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const fs = require('fs');

const path = './config.json';

function checkFileExist() {
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(path)) {
                console.log('File exists.');
                resolve(true);
            } else {
                console.log('File does not exist.');
                resolve(false);
            }
        } catch (err) {
            console.error(err);
            const errCode = 500;
            reject(errCode);
        }
    });
}

function createFile(params) {
    const {
        address, username, password, port,
    } = params;
    return new Promise((resolve, reject) => {
        if (!address || !username || !password || !port) {
            // 'Missing Keys in Request'
            const errCode1 = 400;
            reject(errCode1);
        }
        const data = {
            address, username, password, port,
        };
        const dataToWrite = JSON.stringify(data);
        fs.writeFile(path, dataToWrite, (err) => {
            if (err) {
                const errCode2 = 500;
                reject(errCode2);
            }
            resolve('File written');
        });
    });
}

const createConfigFile = async (req, res) => {
    try {
        const fileExist = await checkFileExist();
        if (fileExist) {
            return res.status(200).send({ success: false, info: 'File already exist' });
        }
        await createFile(req.body);
        return res.status(201).send({ success: true, info: 'File Created' });
    } catch (error) {
        res.sendStatus(error);
    }
};


module.exports = {
    createConfigFile,
};
