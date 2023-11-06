import React from 'react';
import Weather from '../components/Weather';
import Clothes from './ClothesList';
import Trip from './Trip';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Main() {
  return (
    <MainContainer>
      <Weather />
      <Clothes />
      <Trip />
    </MainContainer>
  );
}
