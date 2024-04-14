import styled from '@emotion/styled';

export const ClothesListContainer = styled.div`
  width: 1080px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 720px) {
    width: 720px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

export const ClothesItemContainer = styled.div`
  flex-basis: calc(25% - 20px);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border: 1px solid #999;
    border-radius: 20px;
  }
  @media screen and (max-width: 720px) {
    flex-basis: calc(50%);
    padding: 0px 5px 0px 5px;
    img {
      height: 200px;
      width: 50%;
      object-fit: cover;
    }
  }
`;

export const ClothesWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const MoreButton = styled.button`
  width: 200px;
  height: 60px;
  margin-top: 20px;
  color: white;
  background-color: #5383e8;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px) scale(1.1);
    filter: brightness(1.2);
  }
`;

export const DownScrollWrap = styled.div`
  font-size: 30px;
  margin-top: auto;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-4px) scale(1.1);
    filter: brightness(1.2);
  }
  @media screen and (max-width: 720px) {
  }
`;

export const UpScrollWrap = styled.div`
  font-size: 30px;
  margin-bottom: auto;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(4px) scale(1.1);
    filter: brightness(1.2);
  }
  @media screen and (max-width: 720px) {
  }
`;
