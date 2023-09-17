const mssql = require('mssql');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = {
    mssql,
    sqlConfig,
};
