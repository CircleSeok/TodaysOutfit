import styled, { css } from 'styled-components';

export const WeatherDataContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  flex: 3;
  text-align: center;
  padding: 20px;
  float: right;
  height: 96%;
  color: white;
  font-size: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
  align-items: flex-start;
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
`;
