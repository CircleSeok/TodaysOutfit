import styled, { css } from 'styled-components';

export const WeatherDataContainer = styled.div`
  border: solid 1px black;
  background-color: rgba(0, 0, 0, 0.5);
  width: 30%;
  text-align: center;
  padding: 20px;
  float: right;
  height: 95%;
  color: white;
  font-size: 26px;
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
`;

export const WeatherDisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
