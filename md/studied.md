# 알게된 것
- `MySQL` :  
    - 연결된 클라이언트 확인하기 : `require('mysql').createConnection()` 이후 `.connect()`를 하게 되면, Connections 카운트가 1씩 늘어나게 된다. 이 부분은 `MySQL Workbench -> Server Status` 에서 `Connections` 그래프로 확인 가능하다.
    - 연결된 클라이언트 강제 연결끊기 : `MySQL Workbench -> Server Status` 에서 `Client Connections`에서 리스트를 확인 할 수 있고, 해당 리스트에서 끊고자 하는 연결리스트에 단축메뉴를 띄운 뒤 `Kill Connection(s)` 를 선택한다.
