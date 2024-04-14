import React, { useState, ChangeEvent, useEffect } from 'react';
import { auth, createUser, signIn, signInWithGoogle } from '../api/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  ModalContainer,
  ModalContent,
  Container,
  FormContainer,
  Title,
  CloseButton,
  AuthToggle,
  ErrorMessage,
} from './SignUpStyles';
import ModalStore from '../store/ModalStore';
import useWeatherStore from '../store/WeatherStore';

interface SignUpProps {
  redirectPath: string;
}

const SignUp: React.FC<SignUpProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState<User | null>(null);
  const setUser = useWeatherStore((state) => state.setUser);
  const [nickname, setNickname] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const setModalOpen = ModalStore((state) => state.setIsModalOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  const handleLogin = async () => {
    setErrorMessage('');

    try {
      await signIn(email, password);
      console.log('로그인 성공');
      setModalOpen(false);
    } catch (error) {
      setErrorMessage('이메일이나 비밀번호를 다시 확인해주세요.');
    }
  };

  const handleSignUp = async () => {
    if (nickname.length > 4) {
      setErrorMessage('닉네임은 4글자 이하로 설정해주세요.');
      return;
    }

    setErrorMessage('');

    try {
      await createUser(email, password, nickname);
      console.log('회원가입 성공');
      setUser(auth.currentUser);
      setModalOpen(false);
    } catch (error) {
      setErrorMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const buttonText = isLogin ? '로그인' : '회원가입';

  const handleCloseButtonClick = () => {
    setModalOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (isLogin) {
        handleLogin();
      } else {
        handleSignUp();
      }
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Container>
          <CloseButton onClick={handleCloseButtonClick} />
          <Title>{buttonText}</Title>

          <FormContainer>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleKeyPress}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress}
            />
            {!isLogin && (
              <input
                type='text'
                placeholder='Nickname'
                value={nickname}
                onChange={handleNicknameChange}
                onKeyDown={handleKeyPress}
              />
            )}

            <button
              type='button'
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? '로그인' : '회원가입'}
            </button>
            <button type='button' onClick={signInWithGoogle}>
              구글 아이디로 {isLogin ? '로그인' : '회원가입'}
            </button>
            <p onClick={toggleAuthMode} style={{ cursor: 'pointer' }}>
              {isLogin ? '회원이 아니신가요? ' : '이미 회원이신가요? '}
              {isLogin ? (
                <AuthToggle isLogin={isLogin}>회원가입</AuthToggle>
              ) : (
                <AuthToggle isLogin={isLogin}>로그인</AuthToggle>
              )}
            </p>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </FormContainer>
        </Container>
      </ModalContent>
    </ModalContainer>
  );
};

export default SignUp;
