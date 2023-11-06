import styled from 'styled-components';

export const ClothesListContainer = styled.div`
  width: 1080px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  border: 1px solid red;
`;

export const ClothesItemContainer = styled.div`
  width: calc(25% - 16px);
  list-style: none;
  text-align: center;
  border: 1px solid blue;
`;
