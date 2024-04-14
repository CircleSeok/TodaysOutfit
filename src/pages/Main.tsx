import React from 'react';
import Weather from '../components/Weather';
import Clothes from '../components/ClothesList';
import Leisure from '../components/LeisureList';
import { MainContainer, Section } from './MainStyles';

const Main: React.FC = () => {
  return (
    <MainContainer>
      <Section>
        <div id='weather'>
          <Weather />
        </div>
      </Section>
      <Section>
        <div id='clothes'>
          <Clothes />
        </div>
      </Section>
      <Section>
        <div id='leisure'>
          <Leisure />
        </div>
      </Section>
    </MainContainer>
  );
};

export default Main;
