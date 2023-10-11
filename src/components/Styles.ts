import styled, { css } from 'styled-components';

export const WeatherDataContainer = styled.div`
  border: solid 1px black;
  background-color: rgba(192, 192, 192, 0.5);
  border-radius: 15px;
  width: 30%;
  text-align: center;
  padding: 20px;
  float: right;

  height: 95%;
`;

interface WeatherBackgroundProps {
  backgroundImage: string;
}
export const WeatherBackground = styled.div<WeatherBackgroundProps>`
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover; /* 이미지 크기를 화면에 맞게 조절합니다. */
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%; /* 전체 화면 넓이로 설정합니다. */
  height: 100%; /* 높이를 100%로 설정합니다. */
`;

export const WeatherDisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
