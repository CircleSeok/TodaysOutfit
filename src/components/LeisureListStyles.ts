import styled from 'styled-components';

export const LeisureListContainer = styled.div`
  width: 1080px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid red; */
`;

export const LeisureItemContainer = styled.div`
  flex-basis: calc(25% - 20px);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid green; */
`;

export const LeisureWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const MoreButton = styled.button`
  width: 200px;
  height: 60px;
  margin-top: 20px;
  border: 1px solid #9f9b9b;
  border-radius: 4px;
`;

export const ScrollWrap = styled.div`
  font-size: 30px;
  margin-top: auto;
`;
