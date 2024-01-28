import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from 'react';
import { auth, createUser, signIn, signInWithGoogle } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
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

interface SignUpProps {
  redirectPath: string;
}

const SignUp: React.FC<SignUpProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const setModalOpen = ModalStore((state) => state.setIsModalOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const handleAuth = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setErrorMessage(''); // 초기화

      if (isLogin) {
        try {
          await signIn(email, password);
          console.log('로그인 성공');
          setModalOpen(false);
        } catch (error) {
          setErrorMessage('이메일이나 비밀번호를 다시 확인해주세요.');

          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        }
      } else {
        try {
          await createUser(email, password, nickname);
          console.log('회원가입 성공');
          setModalOpen(false);
        } catch (error) {
          setErrorMessage('회원가입에 실패했습니다. 다시 시도해주세요.');

          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        }
      }
    },
    [isLogin, email, password, nickname]
  );
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

  return (
    <ModalContainer>
      <ModalContent>
        <Container>
          <CloseButton onClick={handleCloseButtonClick} />
          <Title>{buttonText}</Title>

          <FormContainer onSubmit={handleAuth}>
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
            {!isLogin && (
              <input
                type='text'
                placeholder='Nickname'
                value={nickname}
                onChange={handleNicknameChange}
              />
            )}

            <button type='submit'>{buttonText}</button>
            <button onClick={signInWithGoogle}>
              구글 아이디로 {buttonText}
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
