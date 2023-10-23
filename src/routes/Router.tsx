import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Weather from '../components/Weather';
import ClothesInfo from '../pages/ClothesInfo';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Weather />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/clothesinfo' element={<ClothesInfo />} />
    </Routes>
  );
}

export default Router;
