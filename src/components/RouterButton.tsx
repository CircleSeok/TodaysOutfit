import React, { useEffect } from 'react';
import useWeatherStore from '../store/WeatherStore';
import styled from '@emotion/styled';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';
import useNavigateUtil from '../hooks/NavigatUtils';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  button {
    background-color: transparent;
    color: black;
    font-size: inherit;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 10px;

    &:hover {
      background-color: #5f6063;
    }
  }

  span {
    margin-left: auto;
  }
`;

const RouterButton: React.FC = () => {
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
    <ButtonContainer>
      <button onClick={() => handleNavigate('clothe')}>옷추천</button>
      <button onClick={() => handleNavigate('leisure')}>여가추천</button>
      <button onClick={() => handleNavigate('main')}>메인</button>
      <div>
        <span>{user?.displayName}</span>
      </div>
    </ButtonContainer>
  );
};

export default RouterButton;
