/*
 * File: configFileHandler.js
 * Project: crudserver
 * File Created: Saturday, 30th May 2020 2:23:58 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const fs = require('fs');

const path = './config.json';

/**
 * This method checks the file exist or not.
 * If exist return a promise with resolve true otherwise false.
 * @returns promise
 */
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

/**
 * This method create the file with the data specified.
 * @param {Object} params object containing values from client request
 */
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
        // (null, 2) indent the json file created
        const dataToWrite = JSON.stringify(data, null, 2);
        fs.writeFile(path, dataToWrite, (err) => {
            if (err) {
                const errCode2 = 500;
                reject(errCode2);
            }
            resolve('File written');
        });
    });
}

/**
 * This method is handler function of Create config file API.
 * @param {Object} req request object of request
 * @param {Object} res Response object
 */
const createConfigFile = async (req, res) => {
    try {
        const fileExist = await checkFileExist();
        if (fileExist) {
            return res.status(200).send({ success: false, info: 'File already exist' });
        }
        await createFile(req.body);
        return res.status(201).send({ success: true, info: 'File Created' });
    } catch (error) {
        return res.sendStatus(error);
    }
};

/**
 * This method reads the file using read file method of fs module, which returns buffer then
 * it get converted to raw data and sent.
 */
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

/**
 * The method is hander function of Read config File API
 * @param {Object} req Request obejct
 * @param {Object} res Response object
 */
const getFileDetails = async (req, res) => {
    try {
        const fileExist = await checkFileExist();
        if (!fileExist) {
            return res.sendStatus(404);
        }
        const fileContent = await getFileContent();
        return res.status(200).send({ success: true, fileContent });
    } catch (error) {
        return res.sendStatus(error);
    }
};

/**
 * This method delete the config file using unlink method of fs.
 */
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

/**
 * This method is handler function of delete file API.
 * @param {Object} req Request Object
 * @param {Object} res response Object
 */
const deleteConfigFile = async (req, res) => {
    try {
        const fileExist = await checkFileExist();
        if (!fileExist) {
            return res.status(404).send({ success: true, info: 'Already deleted' });
        }
        await deleteFile();
        return res.status(204).send({ success: true, info: 'Successfully Deleted' });
    } catch (error) {
        return res.sendStatus(error);
    }
};

/**
 * This method updates the values of config file as passed in the parameter.
 * It iterates over the object and update the value of key and then write to the file.
 * @param {Object} params Object containig request keys to update file
 */
function updateFileContent(params) {
    const configFile = require('../../config.json');

    return new Promise((resolve, reject) => {
        Object.entries(params).forEach((entry) => {
            configFile[entry[0]] = entry[1];
        });
        console.log('configFile');
        console.log(configFile);
        fs.writeFile(path, JSON.stringify(configFile, null, 2), (err) => {
            if (err) {
                const errCode = 500;
                reject(errCode);
            }
            console.log(`writing to ${path}`);
            resolve('File updated');
        });
    });
}

/**
 * This method is handler function of the update config file API
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
const updateConfigFile = async (req, res) => {
    try {
        const fileExist = await checkFileExist();
        if (!fileExist) {
            return res.sendStatus(404);
        }
        await updateFileContent(req.body);
        return res.sendStatus(204);
    } catch (error) {
        const errCode = error || 500;
        return res.sendStatus(errCode);
    }
};

module.exports = {
    createConfigFile,
    getFileDetails,
    deleteConfigFile,
    updateConfigFile,
};
