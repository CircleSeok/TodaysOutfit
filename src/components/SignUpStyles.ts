import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  width: 600px;
  height: 900px;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  @media screen and (max-width: 720px) {
    width: 50%;
    height: 65%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
`;

export const ErrorMessage = styled.p`
  color: red;
  margin: 10px 0;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 500px;
    height: 80px;
    border-radius: 12px;
    border: 1px solid #8f8f8f;
    background-color: #f9f9f9;
  }
  input + input {
    margin-top: 18px;
  }

  input:nth-child(2) + button {
    margin-top: 154px;
  }

  input:nth-child(3) + button {
    margin-top: 56px;
  }

  p + button {
    margin-top: 115px;
  }

  button {
    width: 500px;
    height: 80px;
    border-radius: 12px;
    background-color: #5383e8;
    border: none;
    font-size: 20px;
    font-weight: 500;
    color: white;
    cursor: pointer;
  }

  button + button {
    margin-top: 18px;
  }

  button + p {
    margin-top: 50px;
  }
  @media screen and (max-width: 720px) {
    input {
      width: 300px;
      height: 50px;
      border-radius: 12px;
      border: 1px solid #8f8f8f;
      background-color: #f9f9f9;
    }
    input + input {
      margin-top: 18px;
    }

    input:nth-child(2) + button {
      margin-top: 110px;
    }

    input:nth-child(3) + button {
      margin-top: 42px;
    }

    p + button {
      margin-top: 115px;
    }

    button {
      width: 300px;
      height: 50px;
      border-radius: 12px;
      background-color: #5383e8;
      border: none;
      font-size: 20px;
      font-weight: 500;
      color: white;
      cursor: pointer;
    }

    button + button {
      margin-top: 18px;
    }

    button + p {
      margin-top: 20px;
    }
  }
`;

export const AuthToggle = styled.span<{ isLogin: boolean }>`
  color: ${(props) => (props.isLogin ? '#5383E8' : '#5383E8')};
`;

// export const LogoContainer = styled.div`
//   background-image: url('/asset/Logo.png');
//   width: 20%;
//   height: 10%;
//   background-repeat: no-repeat;
//   background-size: contain;
//   margin-bottom: 20px;
// `;

export const Title = styled.div`
  margin-bottom: 109px;
  font-size: 40px;
  @media screen and (max-width: 720px) {
    margin-bottom: 20px;
  }
`;

export const CloseButton = styled(IoMdClose)`
  position: absolute;
  top: 60px;
  right: 670px;
  cursor: pointer;
  font-size: 30px;
  color: #5383e8;

  @media screen and (max-width: 720px) {
    top: 170px;
    right: 185px;
  }
`;
