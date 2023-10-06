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
`;

interface WeatherBackgroundProps {
  backgroundImage: string;
}
export const WeatherBackground = styled.div<WeatherBackgroundProps>`
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  height: 100vh;
`;
