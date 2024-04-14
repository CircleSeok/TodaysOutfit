import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';
import Router from './routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
      format('woff');
    font-weight: 400;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard-Regular';
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <Router />
    </BrowserRouter>
  );
}

export default App;
