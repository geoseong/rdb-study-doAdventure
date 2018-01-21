'use strict';

const mysql = require('mysql');
const dbinstance = {};
var currDB;

exports.connMysql = (param, callback) => {
    dbinstance[param.db] = mysql.createConnection({
        host     : 'jopark.c0lay90wlcej.ap-northeast-2.rds.amazonaws.com',
        user     : param.usrid,
        password : param.usrpw,
        port     : '3306',
        database : 'joparkdb'
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
exports.disconnMysql = (param, callback) => {
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
exports.getCurrDB = (callback)=>{
    callback(currDB);
}
exports.connDB = dbinstance;
