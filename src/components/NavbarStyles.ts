import styled from '@emotion/styled';

export const ButtonContainer = styled.div`
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

export const NavContainer = styled.nav`
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
    justify-content: space-between;
  }

  @media (max-width: 720px) {
    > ul > div {
      padding: 0 10px;
      max-width: 720px;
    }
  }
`;
