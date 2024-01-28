import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';
import useWeatherStore from '../store/WeatherStore';
import useNavigateUtil from '../hooks/NavigatUtils';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  button {
    background-color: transparent;
    color: white;
    font-size: inherit;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 10px;
  }
`;

const NavContainer = styled.nav`
  width: 100%;
  font-size: 30px;
  height: 80px;
  background-color: #5383e8;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    justify-content: space-between;
    align-items: center;
  }

  > ul > div {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 1080px;
    /* border: 1px solid red; */
    justify-content: space-between;
  }

  @media (max-width: 720px) {
    > ul > div {
      padding: 0 10px;
      max-width: 720px;
    }
  }
`;

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
