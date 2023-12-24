import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AllClothesData } from '../api/firebase';
import { ClothesItem } from '../components/ClothesList';
import styled from 'styled-components';
import { useComments } from '../hooks/CommenUtils';

const Container = styled.div`
  width: 1080px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
  @media (max-width: 720px) {
    width: 720px;
  }
`;

const MainImgWrap = styled.div`
  width: 60%;
  height: 690px;
  /* border: 1px solid blue; */
  /* @media (max-width: 720px) {
    width: 300px;
  } */
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid black;
`;
const ClothesContainer = styled.div`
  /* display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-basis: calc(25% - 20px); */
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
    border: 1px solid black;
  }
  @media (max-width: 720px) {
    justify-content: space-around;
  }
`;

const Test = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  flex-basis: 250px;
  border: 1px solid red;
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

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 150px;
  margin-top: 20px;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 70%;
  margin-bottom: 10px;
`;

const CommentButton = styled.button`
  width: 60%;
  height: 30%;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  border: 1px solid blue;
`;

const CommentItem = styled.div`
  border: 1px solid black;
  margin-bottom: 10px;
  width: calc(50% - 5px);
  box-sizing: border-box;
`;

interface ClothesDetailProps {
  itemName: string;
  imageURL: string;
  itemDescription: string;
}

const ClothesDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemName, imageURL, itemDescription } =
    location.state as ClothesDetailProps;
  const [randomClothes, setRandomClothes] = useState<ClothesItem[]>([]);

  const { comments, commentText, handleCommentChange, onSubmitComment } =
    useComments('clothes', itemName);

  useEffect(() => {
    const fetchRandomClothes = async () => {
      try {
        const clothesData = await AllClothesData();
        const randomIndexes = getRandomIndexes(clothesData.length, 4);
        const selectedClothes = randomIndexes.map(
          (index) => clothesData[index]
        );
        setRandomClothes(selectedClothes);
      } catch (error) {
        console.error('패치 에러', error);
      }
    };

    fetchRandomClothes();
  }, [itemName]);

  const getRandomIndexes = (max: number, count: number): number[] => {
    const indexes: number[] = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  const handleItemClick = (item: ClothesItem) => {
    navigate(`/clothesrecommend/${encodeURIComponent(item.name)}`, {
      state: {
        itemName: item.name,
        imageURL: item.imageURL,
        itemDescription: item.description,
      },
    });
  };

  return (
    <Container>
      <h1>{itemName}</h1>
      <MainImgWrap>
        <MainImage src={imageURL} alt={itemName} />
      </MainImgWrap>

      {/* <p>{itemDescription}</p> */}

      <h3>추천 옷</h3>
      <ClothesContainer>
        {randomClothes.map((item, index) => (
          <Test key={index} onClick={() => handleItemClick(item)}>
            <img src={item.imageURL} alt={item.name} />
            <p>{item.name}</p>
          </Test>
        ))}
      </ClothesContainer>

      <InputWrap>
        <CommentInput
          type='text'
          value={commentText}
          onChange={handleCommentChange}
          placeholder='댓글을 입력하세요'
        />
        <CommentButton onClick={onSubmitComment}>댓글 작성</CommentButton>
      </InputWrap>

      <CommentContainer>
        {comments.slice(0, 8).map((comment) => (
          <CommentItem key={comment.id}>
            <p>{comment.text}</p>
          </CommentItem>
        ))}
      </CommentContainer>
    </Container>
  );
};

export default ClothesDetail;
