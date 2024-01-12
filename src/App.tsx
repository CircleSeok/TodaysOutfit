import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';

import Router from './routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    
  }

  body {
    font-family: 'Pretendard-Regular', Arial, sans-serif;
  }

 
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <Router />
    </BrowserRouter>
  );
}

export default App;
