# 서버요청 & 응답문

## 서버 요청형식

- 데이터베이스 연결 추가 : POST /db/addConn
    - 요청
    ```
    {
        "d": "mysql",
        "i": "*****",
        "p": "*****"
    }
    ```

    - 응답
    ```
    {
        "resp": "환영합니다. 관리자 *****님."
    }
    ```

- 데이터베이스 연결 해제 : POST /db/disConn
    - 요청
    ```
    {
        "d": "mysql",
        "i": "creators",
        "p": "ruddudrltnf"
    }
    ```
    - 응답
    ```
    {"resp":`disconnected`}
    ```

- 회원가입 : POST /account/addUser
    - 요청
    ```
    {
        "user_id": "geoseong",
        "phone": "01078907890",
        "address": "서울 종각 엔젤리너스",
        "birth": "890119",
        "gender": "1",
        "email": "geoseong@github.com",
        "cash": "0",
        "rank": "0",
        "password": "1234",
        "user_name": "박거성",
        "session_id": null
    }
    ```
    - 응답
    ```
    {'resp': results}
    ```
- 로그인 : POST /account/login


## 서버 공통 응답 형식
- 정상 리턴 :  
{"resp" : [Object]}
- 에러 리턴 :  
{"error" : [Object]}
