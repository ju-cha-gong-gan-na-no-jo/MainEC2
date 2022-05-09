# MainEC2

<h3>목차</h3>
1.<a>개요<a><br>
2.<a>시스템 아키택처 구성도<a><br>
3.<a>소스 폴더 구조<a><br>

<br>

<h3>1.개요</h3>
  각 모듈과의 통신, 프론트페이지와의 연동을 맡은 서버입니다.


  <h3>2.시스템 아키택처 구성도

  ![image](https://user-images.githubusercontent.com/66003049/167352997-e0cbe5d7-e4d7-4413-82dd-214278caf386.png)
    <br>
  </h3>
  
  
<h3>3.소스 폴더 구조</h3>
  <br>
  
1) public/   
  - css : css파일이 담겨있는 폴더입니다. 
  - img : img 파일이 담겨있는 폴더입니다.   
  - js: js파일이 담겨있는 폴더입니다.    
  
2) routes/   
  - content.js : content를 만들기위해 결제모듈, 주차현황 모듈에서 만들어진 api를 실행한후 받아온 데이터를 가공하여 ejs로 보내주는 역할을 하는 js파일입니다.
  - main.js :  회원관리 모듈이 만든 api를 실행하여 회원가입과 로그인시 세션유지 등 회원 관리를 하고, 차량이 들어왔을때 파이에서 넘어온 이벤트를 가지고 각모듈간의 통신을 통해 데이터를 전달하는 역할을 하는 js파일입니다.
  - manager.js : 관리자로그인에 대한 세션유지와 관리자페이지 메핑을 하는 js파일입니다.
  - statistics.js : rds에 담긴 과거데이터를 가저고 유휴공간 산정 api와 수익관리 api를 만드는 파일입니다.
  - store.js : 상점로그인에 대한 세션유지와 상점 페이지를 메핑을 하는 js파일입니다.
  
3) views/   
  - content/ : views/manager폴더와 views/store안의 .ejs파일에 iframe으로 보여줄 content를 담은 ejs모음입니다. 
  - manager/ : 아파트 관리소장이 볼 .ejs파일이 담겨있는 폴더입니다.
  - store/ : 상점에서 볼 .ejs파일이 담겨있는 폴더입니다.
  
  
4) app.js : public, views, routes, port를 설정하고 각각을 한번에 실행하는 js 파일입니다.

  
  
