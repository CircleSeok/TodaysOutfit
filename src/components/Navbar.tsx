import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';
import useWeatherStore from '../store/WeatherStore';
import { ButtonContainer, NavContainer } from './NavbarStyles';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = useWeatherStore((state) => state.user);
  const setUser = useWeatherStore((state) => state.setUser);

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
            <button onClick={() => navigate('/clothesrecommend')}>
              옷추천
            </button>
            <button onClick={() => navigate('/leisurerecommend')}>
              여가추천
            </button>
            <button onClick={() => navigate('/')}>메인</button>
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
