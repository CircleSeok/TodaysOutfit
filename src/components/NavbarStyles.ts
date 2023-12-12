import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  height: 70px;
`;

export const NavbarLeft = styled.div`
  margin: 0;
`;

export const NavbarMiddle = styled.div`
  input {
    width: 500px;
    padding: 5px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    height: 30px;
  }
`;

export const NavbarRight = styled.div`
  font-size: 30px;
`;
