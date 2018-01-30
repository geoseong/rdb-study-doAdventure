'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CORS = require('cors')();  // CORS setting : enable crossdomain access
const readline = require('readline');
const dbconn = require('./db/conn');

app.use(CORS);   // CORS setting : enable crossdomain access

/* Body-Parser 추가 : 터미널설치 - npm i body-parser --save */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* set Max Listeners (이벤트리스너 기본연결값 : 10) */
require('events').EventEmitter.defaultMaxListeners = 100;

/* Connect to Web Server */
var port = '6697';
app.listen(port, () => {
    console.log('[Express] Study Game Web Server started at %d port', port);
});


/* 사용자 정의 Middleware 추가. 이처럼 라우팅 모듈 설정 시에는 파라미터를 두개 사용
첫번째 파라미터의 주소에 대해서는 두번째 파라미터로 오는 미들웨어가 담당하도록 한다 */
app.use('/db', require('./routes/dbconn'));      // 1. 데이터베이스 연결 관리
app.use('/account', require('./routes/account'));  // 2. 회원 관리

app.get('/', (req, res) => {
    res.header('Content-type','application/json');
    res.send({'resp': 'Connection is working well'});
});

/** DB Connection Pool Practice **/
app.get('/dbpool', (req, res) => {
    dbconn.connPool({db: 'mysql'}, (instance, err)=>{
        console.log('instance mysql', instance.mysql.config);   //13881
        console.log('error?', err);
        dbconn.connDB['mysql'].query('SELECT * FROM user_manage_tbl', (error, results, fields) => {
            res.header('Content-type','application/json');
            res.send({'results': results });
            // res.send(instance.mysql);
        });
    })
});
app.get('/dbpoolquerydirect', (req, res) => {
    // 13886
    dbconn.connDB['mysql'].query('SELECT * FROM user_manage_tbl', (error, results, fields) => {
        res.header('Content-type','application/json');
        res.send({'results': results });
        // res.send(instance.mysql);
    });
});

app.get('/dbpoolquerymulti', (req, res) => {
    // 13886
    dbconn.connDB['mysql'].getConnection((err, connection) => {
        console.log('[dbpoolquerymulti]err', err);
        console.log('[dbpoolquerymulti]connection', connection);
        connection.query('SELECT * FROM user_manage_tbl', (error, results, fields) => {
            res.header('Content-type','application/json');
            res.send({'results': results });
        });
    });
});

app.get('/dbpoolrelease', (req, res) => {
    // 13886
    dbconn.connDB['mysql'].getConnection((err, connection) => {
        console.log('[dbpoolquerymulti]err', err);
        console.log('[dbpoolquerymulti]connection', connection);
        connection.release();
        res.header('Content-type','application/json');
        res.send({'results': 'yeah' });
    });
});
/** end of DB Connection Pool Practice **/

// Express 오류 처리
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

// module.exports = connection;
