import styled, { css } from 'styled-components';

export const WeatherInfo = styled.div`
  margin: 100px auto;
  background-color: white;
  width: 70%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
`;

export const WeatherDataContainer = styled.div`
  border: solid 1px black;
  background-color: white;
  border-radius: 15px;
  width: 10%;
  text-align: center;
  padding: 20px;
  margin-left: 1650px;
`;

interface WeatherBackgroundProps {
  backgroundImage: string;
}
export const WeatherBackground = styled.div<WeatherBackgroundProps>`
  background-image: url(${(props) => props.backgroundImage});
  background-size: 70% 70%; /* 이미지 크기 조절 */
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
`;

export const WeatherDisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
