import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';
import useWeatherStore from '../store/WeatherStore';
import useNavigateUtil from '../hooks/NavigatUtils';
import { ButtonContainer, NavContainer } from './NavbarStyles';

const Navbar: React.FC = () => {
  const user = useWeatherStore((state) => state.user);
  const setUser = useWeatherStore((state) => state.setUser);
  const { handleNavigate } = useNavigateUtil();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <NavContainer>
      <ul>
        <div>
          <ButtonContainer>
            <button onClick={() => handleNavigate('clothe')}>옷추천</button>
            <button onClick={() => handleNavigate('leisure')}>여가추천</button>
            <button onClick={() => handleNavigate('main')}>메인</button>
          </ButtonContainer>
          <div>
            <span>{user?.displayName}님</span>
          </div>
        </div>
      </ul>
    </NavContainer>
  );
};

export default Navbar;
