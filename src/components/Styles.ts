import styled, { css } from 'styled-components';

export const WeatherDataContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  flex: 3;
  text-align: left;
  padding: 20px;
  height: 100%;
  color: white;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  /* border: solid 1px red; */
  width: 90%;
  margin-top: 30px;
  input {
    font-size: 25px;
    background-color: transparent;
    width: 490px;
    padding: 5px;
    border: none;
    font-size: 16px;
    height: 30px;
    color: white;
    border-bottom: 1px solid white;
    &::placeholder {
      color: white;
    }
  }
`;

export const WeatherDetails = styled.div`
  /* border: solid 1px blue; */
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  width: 90%;
  h4 {
    border-bottom: 1px solid white;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
  align-items: flex-start;
  margin-left: 30px;
  height: 100%;
`;

export const LeftBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100%;
`;

export const CityandTemp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  font-size: 60px;
  & > h1 {
    margin-left: 40px;
  }
`;

interface WeatherBackgroundProps {
  backgroundImage: string;
}
export const WeatherBackground = styled.div<WeatherBackgroundProps>`
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 30px;
  display: flex;
`;

export const WeatherDisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 1903px;
`;

export const DownBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 280px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px) scale(1.1);
    filter: brightness(1.2);
  }
`;

//웹디 경력
//중국어 가능 일본어 가능 영어 가능

//유안누님도 학교 성적이 씨발 개쩔잖아
// 이런거 씨발 보는거같다 ... 씨발 ....
//그러니까 나 면저볼떄 공부안했네요ㅕ? ㅋㅋㅋ
