import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import Clothes from '../pages/Clothes';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/clothes' element={<Clothes />} />
    </Routes>
  );
}

export default Router;
