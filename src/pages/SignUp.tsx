import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { auth, createUser, signIn, signInWithGoogle } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      signIn(email, password)
        .then(() => {
          console.log('로그인 성공');
          navigate('/');
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      createUser(email, password)
        .then(() => {
          console.log('회원가입 성공');
          navigate('/');
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const buttonText = isLogin ? '로그인' : '회원가입';

  return (
    <>
      {user ? (
        <div>
          <p>이미 로그인되어 있습니다.</p>
          <button onClick={() => navigate('/clothesinfo')}>
            Clothes Info 페이지로 이동
          </button>
        </div>
      ) : (
        <form onSubmit={handleAuth}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          <button type='submit'>{buttonText}</button>
          <button onClick={signInWithGoogle}>Google로 로그인</button>
          <p onClick={toggleAuthMode} style={{ cursor: 'pointer' }}>
            {isLogin
              ? '회원이 아니신가요? 회원가입'
              : '이미 회원이신가요? 로그인'}
          </p>
        </form>
      )}
    </>
  );
}
