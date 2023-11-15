import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
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
} from './SignUpStyles';

interface SignUpProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ handleClose }) => {
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

  const handleCloseButtonClick = () => {
    handleClose(false);
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Container>
          <CloseButton onClick={handleCloseButtonClick}>닫기</CloseButton>
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
            <button type='submit'>{buttonText}</button>
            <button onClick={signInWithGoogle}>구글 아이디로 로그인</button>
            <p onClick={toggleAuthMode} style={{ cursor: 'pointer' }}>
              {isLogin
                ? '회원이 아니신가요? 회원가입'
                : '이미 회원이신가요? 로그인'}
            </p>
          </FormContainer>
        </Container>
      </ModalContent>
    </ModalContainer>
  );
};

export default SignUp;
