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

function getFileContent() {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, dataBuffer) => {
            if (err) {
                const errCode2 = 500;
                reject(errCode2);
            }
            console.log('file data ');
            const data = JSON.parse(dataBuffer.toString());
            console.log(data);
            resolve(data);
        });
    });
}

const getFileDetails = async (req, res) => {
    try {
        const fileExist = await checkFileExist();
        if (!fileExist) {
            return res.sendStatus(404);
        }
        const fileContent = await getFileContent();
        return res.status(200).send({ success: true, fileContent });
    } catch (error) {
        res.sendStatus(error);
    }
};

function deleteFile() {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) {
                const errCode2 = 500;
                reject(errCode2);
            }
            console.log('path/file.txt was deleted');
            resolve('Deleted Successfully');
        });
    });
}

const deleteConfigFile = async (req, res) => {
    try {
        const fileExist = await checkFileExist();
        if (!fileExist) {
            return res.status(404).send({ success: true, info: 'Already deleted' });
        }
        await deleteFile();
        res.status(204).send({ success: true, info: 'Successfully Deleted' });
    } catch (error) {
        res.sendStatus(error);
    }
};

module.exports = {
    createConfigFile,
    getFileDetails,
    deleteConfigFile,
};
