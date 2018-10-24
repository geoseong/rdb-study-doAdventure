'use strict';
const dbconn = require('../db/conn');
const queries = require('../db/queries');
const tables = require('../db/tables');
const defaultDB = require('../index');

exports.addUser = (req, res) => {
    console.log('/account/addUser', req.body);
    let validCols = [
        'user_id', 'password', 'phone', 'address', 'birth',
        'gender', 'email', 'user_name'
    ];
    let reqBody = req.body;
    Object.keys(reqBody).forEach((d,i)=>{
        console.log('d,i', d,i);
        validCols.splice(validCols.indexOf(d), 1);
    });
    if(validCols.length > 0){
        return res.send({'resp' : {412: validCols}});
    }
    let insertVals = {
        "user_id": reqBody.user_id,
        "phone": reqBody.phone,
        "address": reqBody.address,
        "birth": reqBody.birth,
        "gender": reqBody.gender,
        "email": reqBody.email,
        "cash": "0",
        "rank": "0",
        "password": reqBody.password,
        "user_name": reqBody.user_name,
        "session_id": null
    }
    dbconn.instance[defaultDB.db].query(
        queries.insert.addUser,
        [tables['user_manage_tbl'], insertVals],
        function (error, results, fields) {
            if (error){
                return res.send({'resp' : {500: error}});
            }
            console.log('/addUser results', results);
            return res.send({'resp': {200 : 1}});
        }
    );
};

exports.login = function(req, res){

};

/* for test */
exports.query = (req, res) => {
    console.log('/account/query req.body:', req.body);
    console.log('/account/query defaultDB:', defaultDB.db);
    dbconn.instance[defaultDB.db].query(queries.select['user_manage_tbl'], function (error, results, fields) {
        if (error) {
            console.error('[connection.query]error: ' + error);
            return res.send({'error': error});
        }
        // console.log('[connection.query]results', results);
        return res.send({'resp': results});
    });
};
