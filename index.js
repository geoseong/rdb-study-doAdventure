'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CORS = require('cors')();  // CORS setting : enable crossdomain access
const readline = require('readline');
const dbconn = require('./db/conn');
const defaultDB = 'mysql';

app.use(CORS);   // CORS setting : enable crossdomain access

/* Body-Parser 추가 : 터미널설치 - npm i body-parser --save */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* set Max Listeners (이벤트리스너 기본연결값 : 10) */
require('events').EventEmitter.defaultMaxListeners = 100;

/* Connect to Web Server */
var port = '6697';
app.listen(port, () => {
    dbconn.createDBPool({db: defaultDB}, (result)=>{
        if(result.result === 0){
            console.error('[Express] Error: create DB Connection Pool');
        }else{
            console.log('[Express] Study Game Web Server started at %d port', port);
        }
    });
});


/* 사용자 정의 Middleware 추가. 이처럼 라우팅 모듈 설정 시에는 파라미터를 두개 사용
첫번째 파라미터의 주소에 대해서는 두번째 파라미터로 오는 미들웨어가 담당하도록 한다 */
// app.use('/dbpool', require('./routes/dbconnpool'));  // 0. 데이터베이스 connection pool 관리
// app.use('/db', require('./routes/dbconn'));      // 1. 데이터베이스 연결 관리
app.use('/account', require('./routes/account'));  // 2. 회원 관리

app.get('/', (req, res) => {
    console.log('--------------dbconn instance\n', dbconn.instance);
    res.send({'created export variables at conn.js': Object.keys(dbconn)});
});

// Express 오류 처리
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

module.exports.db = defaultDB;
