import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* background-color: black;
  color: white; */
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  background-image: url('/asset/Logo.png');
  width: 20%;
  height: 10%;
  background-repeat: no-repeat;
  background-size: contain;
  margin-bottom: 20px;
`;
