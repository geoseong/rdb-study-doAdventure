// account.js
'use strict';

const express = require('express');
const router = express.Router();
const accountController = require('../models/account');

/** 회원가입(addUser) **/
router.post('/au', accountController.addUser);
/** 로그인(login) **/
router.post('/li', accountController.login);

/** 쿼리 테스트 **/
router.post('/query', accountController.query);

module.exports = router;
