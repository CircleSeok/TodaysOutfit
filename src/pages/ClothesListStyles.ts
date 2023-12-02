import { scroller } from 'react-scroll';
import styled from 'styled-components';

export const ClothesListContainer = styled.div`
  width: 1080px;
  height: 100vh;
  border: 1px solid red;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ClothesItemContainer = styled.div`
  flex-basis: 25%;
  padding: 45px;
  border: 1px solid green;
`;

export const ClothesWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MoreButton = styled.button`
  width: 200px;
  height: 60px;
  margin-top: 20px;
`;

export const ScrollWrap = styled.div`
  font-size: 30px;
`;
