import styled from 'styled-components';

export const LeisureListContainer = styled.div`
  width: 1080px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid red; */
  @media screen and (max-width: 720px) {
    width: 720px;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

export const LeisureItemContainer = styled.div`
  flex-basis: calc(25% - 20px);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid green; */
  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    border: 1px solid black;
    border-radius: 20px;
  }
  /* border: 1px solid green; */
  @media screen and (max-width: 720px) {
    flex-basis: calc(50% - 10px);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid green;

    img {
      border: 1px solid red;
      height: 100%;
      width: 50%;
      object-fit: cover;
    }
  }
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
  color: white;
  /* border: 1px solid #9f9b9b; */
  background-color: #18a0fb;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px) scale(1.1);
    filter: brightness(1.2);
  }
`;

export const ScrollWrap = styled.div`
  font-size: 30px;
  margin-top: auto;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px) scale(1.1);
    filter: brightness(1.2);
  }
`;
