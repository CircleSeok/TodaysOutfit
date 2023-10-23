import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';
import { createGlobalStyle } from 'styled-components';

import Router from './routes/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
