import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AllClothesData } from '../api/firebase';
import { ClothesItem } from './ClothesList';
import styled from 'styled-components';
import { useComments } from '../hooks/CommenUtils';

const Container = styled.div`
  width: 1080px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
`;
const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
`;
const ClothesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const CommentContainer = styled.div`
  margin-top: 20px;
`;

const CommentItem = styled.div`
  border: 1px solid black;
  margin-bottom: 10px;
`;

interface ClothesDetailProps {
  itemName: string;
  imageURL: string;
  itemDescription: string;
}

const ClothesDetail: React.FC = () => {
  const location = useLocation();
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

  return (
    <Container>
      <p>{itemName}</p>
      <MainImage src={imageURL} alt={itemName} />
      <p>{itemDescription}</p>

      <p>추천 옷</p>
      <ClothesContainer>
        {randomClothes.map((item, index) => (
          <div key={index}>
            <img src={item.imageURL} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </ClothesContainer>

      <CommentContainer>
        <input
          type='text'
          value={commentText}
          onChange={handleCommentChange}
          placeholder='댓글을 입력하세요'
        />
        <button onClick={onSubmitComment}>댓글 작성</button>
      </CommentContainer>

      <CommentContainer>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <p>{comment.text}</p>
          </CommentItem>
        ))}
      </CommentContainer>
    </Container>
  );
};

export default ClothesDetail;
