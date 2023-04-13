import "./App.scss";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [location, setLocation] = useState(""); // 장소검색을 했을 때, 받아올 스테이트
  const [result, setResult] = useState({}); // 도시, 온도, 상태를 확인받을 스테이트

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  //키를 url로 사용하고 싶을 때

  const searchWeather = async (e) => {
    // async async 비동기로 신호요청을 보내서 서버에서 정보를 받아오는 동안,
    // 브라우저에서 할 일을 해야하기 때문에 비동기로 받아온다.
    if (e.key === "Enter") {
      try {
        const data = await axios({
          method: "get", // 도시이름을  입력하면 받와야하기 때문에 get 요청
          url: url, // 뭘 통해서!!?
        }); //데이터 받아지는지 확인(확인ㅇㅇ)
        setResult(data); //결과 상태 변환
      } catch (err) {
        //나머지 다 에러
        alert(err);
      }
    }
  };

  // 참고: async/await 는 ECMAScript 2017 문법
  // 해당 문법은 인터넷 익스플로러와 오래된 브라우저에서 지원되지 않음.

  return (
    <AppWrap>
      {result?.data?.weather[0]?.main === "Clear" ? <img /> : null}
      <script type="module" src="background.js"></script>
      <img className="BackgrouondImg" src="./img/earth.jpeg" />
      <div className="Title">WEADA</div>
      <div className="App">
        <input
          placeholder="도시를 입력하세요"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !== 0 && (
          <ResultWeap>
            <div className="city">{result.data.name}</div>
            {/* <div className='temperture'>{result.data.main.temp}</div> //화씨온도로 가져오는 경우 */}

            <div className="temperture">
              {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
            </div>
            {/*기본은 화씨온도(미국이 만들었나?) 섭씨온도로 바꾸는 식을 적용해서 섭씨로 변환*/}
            <div className="sky">{result.data.weather[0].main}</div>
          </ResultWeap>
        )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vw;
  color: white;
  background-image: url(https://i.pinimg.com/originals/7f/cb/72/7fcb721b4f2a3bece0c765b86c5ff6c1.jpg);
  background-size: cover;

  .Title {
    font-size: 100px;
    top: 20%;
    left: 50%;
    margin-top: 60px;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }
  .App {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }
  input {
    padding: 16px;
    border: 1px white solid;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    backdrop-filter: blur(2px);
    /* shadow: {
    background-color: black;
    width: 200;
    height: 200;
  } */
  }
`;

const ResultWeap = styled.div`
  margin-top: 30px;
  padding: 50px;
  border: 1px white solid;
  border-radius: 8px;
  backdrop-filter: blur(4px);

  .city {
    font-size: 24px;
  }
  .temperture {
    font-size: 60px;
    margin: 8px, 30px, 0px, 30px;
  }
  .sky {
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`;
