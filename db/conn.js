'use strict';

const mysql = require('mysql');
const dbProp = require('../.prop/props').db;

const dbinstance = {};
var currDB;

const connMysql = (param, callback) => {
    console.log('[connMysql] param', param);
    dbinstance[param.db] = mysql.createConnection({
        host     : dbProp[param.db].host,
        user     : dbProp[param.db].user,
        password : dbProp[param.db].password,
        port     : dbProp[param.db].port,
        database : dbProp[param.db].database,
    });
    dbinstance[param.db].connect((err, packet) => {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return callback(null, err.code);
        }
        console.log('[mysql]Connected to database.');
        currDB = param.db;
        return callback(dbinstance, null);
    });
}
const disconnMysql = (param, callback) => {
    console.log('[disconnMysql] param', param);
    dbinstance[param.db].end(function(err) {
        if (err) {
            console.error('Database disconn failed: ' + err.stack);
            return callback(err);
        }
        console.log('[mysql]disconnected to database.');
        currDB = '';
        return callback();
    });
}

exports.connectDB = (param, callback) => {
    console.log('[connectDB] param', param);
    switch (param.db){
        case 'mysql':
            connMysql(param, callback);
            break;
        default:
            connMysql(param, callback);
    }
}
exports.disconnectDB = (param, callback) => {
    console.log('[connectDB] param', param);
    switch (param.db){
        case 'mysql':
            disconnMysql(param, callback);
            break;
        default:
            disconnMysql(param, callback);
    }
}


exports.getCurrDB = (callback)=>{
    callback(currDB);
}
exports.connDB = dbinstance;
