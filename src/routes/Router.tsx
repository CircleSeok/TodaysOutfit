import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../components/SignUp';
import Main from '../pages/Main';
import Clothes from '../components/ClothesList';
import Leisure from '../components/Leisure';
import ClothesRecommend from '../pages/ClothesRecommend';
import LeisureRecommend from '../pages/LeisureRecommend';
import ClothesDetail from '../pages/ClothesDetail';
import LeisureDetail from '../pages/LeisureDetail';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/signup' element={<SignUp redirectPath='/' />} />
      <Route path='/clothes' element={<Clothes />} />
      <Route path='/leisure' element={<Leisure />} />
      <Route path='/clothesrecommend' element={<ClothesRecommend />} />
      <Route path='/leisurerecommend' element={<LeisureRecommend />} />
      <Route path='/clothesrecommend/:itemName' element={<ClothesDetail />} />
      <Route path='/leisurerecommend/:itemName' element={<LeisureDetail />} />
    </Routes>
  );
}

export default Router;
