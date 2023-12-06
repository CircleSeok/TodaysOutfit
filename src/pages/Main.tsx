import React, { useState } from 'react';
import { Link, Element } from 'react-scroll';
import Weather from '../components/Weather';
import Clothes from '../components/ClothesList';
import Leisure from '../components/Leisure';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main: React.FC = () => {
  // const [activeSection, setActiveSection] = useState('');

  // const handleSetActive = (to: string) => {
  //   setActiveSection(to);
  // };

  return (
    <MainContainer>
      <Section>
        <Element name='weather'>
          <Weather />
        </Element>
      </Section>
      <Section>
        <Element name='clothes'>
          <Clothes />
        </Element>
      </Section>
      <Section>
        <Element name='leisure'>
          <Leisure />
        </Element>
      </Section>

      {/* <nav>
        <ul>
          <li>
            <Link
              to='weather'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={handleSetActive}
            >
              Weather
            </Link>
          </li>
          <li>
            <Link
              to='clothes'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={handleSetActive}
            >
              Clothes
            </Link>
          </li>
          <li>
            <Link
              to='leisure'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={handleSetActive}
            >
              Leisure
            </Link>
          </li>
        </ul>
      </nav> */}
    </MainContainer>
  );
};

export default Main;
