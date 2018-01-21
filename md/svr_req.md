# 서버요청 & 응답문

## 서버 요청형식
- 회원가입 : POST /account/addUser
- 로그인 : POST /account/login

- 데이터베이스 연결 추가 : POST /db/addConn
- 데이터베이스 연결 해제 : POST /db/disConn

## 서버 응답형식
- 정상 리턴 :  
{"resp" : [Object]}
- 에러 리턴 :  
{"error" : [Object]}
