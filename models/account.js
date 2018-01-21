'use strict';
const dbconn = require('../db/conn');
const queries = require('../db/queries');
const tables = require('../db/tables');

exports.addUser = function(req, res){
    console.log('/addUser', req.body);
    var reqBody = req.body;
    dbconn.getCurrDB((db)=>{
        dbconn.connDB[db].query('INSERT INTO ?? SET ?', [tables['user_manage_tbl'], reqBody], function (error, results, fields) {
            if (error){
                return res.send({'error': error});
            }
            console.log('/addUser results', results);
            return res.send({'resp': results});
        });
    });
};

exports.login = function(req, res){

};

/* for test */
exports.query = function(req, res){
    console.log('/query', req.body);
    dbconn.getCurrDB((db)=>{
        console.log('getCurrDB', db);
        dbconn.connDB[db].query(queries.select['user_manage_tbl'], function (error, results, fields) {
            if (error) {
                console.error('[connection.query]error: ' + error);
                return res.send({'error': error});
            }
            console.log('[connection.query]results', results);
            return res.send({'resp': results});
        });
    })

};
