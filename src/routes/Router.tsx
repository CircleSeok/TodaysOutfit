import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import SignUp from '../components/SignUp';
import Main from '../pages/Main';
import Clothes from '../components/ClothesList';
import Leisure from '../components/Leisure';
import ClothesRecommend from '../pages/ClothesRecommend';
import LeisureRecommend from '../pages/LeisureRecommend';
import ClothesDetail from '../pages/ClothesDetail';
import LeisureDetail from '../pages/LeisureDetail';
import Navbar from '../components/Navbar';
import useWeatherStore from '../store/WeatherStore';

function Router() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';
  const user = useWeatherStore((state) => state.user);

  const isAuthenticated = user !== null;

  const checkAccess = (element: React.ReactElement) => {
    if (!isAuthenticated) {
      return <Navigate to='/signup' />;
    }
    return (
      <>
        {showNavbar && <Navbar />} {element}
      </>
    );
  };

  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/signup' element={<SignUp redirectPath='/' />} />
      <Route path='/clothes' element={checkAccess(<Clothes />)} />
      <Route path='/leisure' element={checkAccess(<Leisure />)} />
      <Route
        path='/clothesrecommend'
        element={checkAccess(<ClothesRecommend />)}
      />
      <Route
        path='/leisurerecommend'
        element={checkAccess(<LeisureRecommend />)}
      />
      <Route
        path='/clothesrecommend/:itemName'
        element={checkAccess(<ClothesDetail />)}
      />
      <Route
        path='/leisurerecommend/:itemName'
        element={checkAccess(<LeisureDetail />)}
      />
    </Routes>
  );
}

export default Router;
