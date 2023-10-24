import React from 'react';
import { signOutUser } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

export default function ClothesInfo() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser().then(() => {
      console.log('로그아웃 성공');
      navigate('/');
    });
  };
  return (
    <div>
      옷 정보
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
