import styled from 'styled-components';

export const LeisureListContainer = styled.div`
  width: 1080px;
  border: 1px solid red;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LeisureItemContainer = styled.div`
  flex-basis: 25%;
  padding: 45px;
  border: 1px solid green;
`;

export const LeisureWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MoreButton = styled.button`
  width: 200px;
  height: 60px;
  margin-top: 50px;
`;
