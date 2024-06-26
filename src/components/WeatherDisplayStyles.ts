import styled from '@emotion/styled';
import { IoLogOutSharp, IoLogInSharp } from 'react-icons/io5';

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
  @media screen and (max-width: 720px) {
    padding: 10px;
    font-size: 18px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
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
    @media screen and (max-width: 720px) {
      font-size: 16px;
      width: 100%;
    }
  }
`;

export const WeatherDetails = styled.div`
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
  @media screen and (max-width: 720px) {
    align-items: flex-start;
    margin-left: 5;

    p {
      font-size: 30px;
    }
  }
`;

export const DateandUser = styled.div`
  margin-top: 25px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LogInLogOutBtn = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-between;
  p {
    margin-right: 50px;
    color: white;
  }
`;

export const StyledLogoutIcon = styled(IoLogOutSharp)`
  margin-top: 35px;
  color: red;
  font-size: 30px;
`;

export const StyledLoginIcon = styled(IoLogInSharp)`
  margin-top: 35px;
  color: green;
  font-size: 30px;
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
  @media screen and (max-width: 720px) {
    align-items: center;
    margin-bottom: -70px;
    & > h1 {
      font-size: 40px;
    }
    & > h1 {
      margin-top: 50px;
      font-size: 40px;
    }
  }
`;

interface WeatherBackgroundProps {
  backgroundimage: string;
}

export const WeatherBackground = styled.div<WeatherBackgroundProps>`
  background-image: url(${(props) => props.backgroundimage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 720px) {
    font-size: 18px;
  }
`;

export const WeatherDisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 1903px;
  @media screen and (max-width: 720px) {
    width: 720px;
  }
`;

export const DownBtn = styled.div`
  font-size: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 280px;

  margin-bottom: auto;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-4px) scale(1.1);
    filter: brightness(1.2);
  }
  @media screen and (max-width: 720px) {
    margin-left: 95px;
  }
`;
