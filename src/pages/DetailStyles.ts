import styled from '@emotion/styled';

export const Container = styled.div`
  /* border: 1px solid blue; */
  width: 1080px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 720px) {
    width: 720px;
  }
`;

export const MainImgWrap = styled.div`
  width: 60%;
  height: 690px;
  /* border: 1px solid blue; */
  /* @media (max-width: 720px) {
    width: 300px;
  } */
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #999;
`;
export const ClothesContainer = styled.div`
  /* display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-basis: calc(25% - 20px); */
  /* width: 1080px; */
  /* border: 1px solid red; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  img {
    height: 350px;
    width: 100%;
    object-fit: cover;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-radius: 8px;
    border: 1px solid #999;
  }
  @media (max-width: 720px) {
    justify-content: space-around;
  }
`;

export const RecommendationList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  flex-basis: 250px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px) scale(1);
  }
  /* flex-basis: calc(25% - 20px); */

  p {
    margin-top: 10px;
  }
`;

export const InputWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 150px;
  margin-top: 20px;
`;

export const CommentInput = styled.input`
  width: 100%;
  height: 70%;
  margin-bottom: 10px;
  font-size: 15px;
`;

export const CommentButton = styled.button`
  background-color: #5383e8;
  color: white;
  width: 60%;
  height: 30%;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const CommentItem = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 10px;
  width: calc(50% - 5px);
  box-sizing: border-box;
  P {
    margin-left: 10px;
  }
`;
