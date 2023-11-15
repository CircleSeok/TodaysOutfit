import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import Clothes from '../pages/ClothesList';
import ClothesDetail from '../pages/ClothesDetail';
import LeisureDetail from '../pages/LeisureDetail';
import Leisure from '../pages/Leisure';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/signup' element={<SignUp redirectPath='/' />} />
      <Route path='/clothes' element={<Clothes />} />
      <Route path='/leisure' element={<Leisure />} />
      <Route path='/clothesdetail' element={<ClothesDetail />} />
      <Route path='/leisuredetail' element={<LeisureDetail />} />
    </Routes>
  );
}

export default Router;
