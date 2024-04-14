import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { AllClothesData } from '../api/firebase';
import { useComments } from '../hooks/CommenUtils';
import {
  ClothesContainer,
  CommentButton,
  CommentContainer,
  CommentInput,
  CommentItem,
  Container,
  InputWrap,
  MainImage,
  MainImgWrap,
  RecommendationList,
} from './DetailStyles';
import { ClothesItem } from '../types/ClothesItem';

const ClothesDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemName, imageURL } = location.state;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitComment();
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

      <h3>추천 옷</h3>
      <ClothesContainer>
        {randomClothes.map((item) => (
          <RecommendationList
            key={uuidv4()}
            onClick={() => handleItemClick(item)}
          >
            <img src={item.imageURL} alt={item.name} />
            <p>{item.name}</p>
          </RecommendationList>
        ))}
      </ClothesContainer>

      <InputWrap onSubmit={handleSubmit}>
        <CommentInput
          type='text'
          value={commentText}
          onChange={handleCommentChange}
          placeholder='댓글을 입력하세요 10자 이내'
          maxLength={10}
        />
        <CommentButton type='submit'>댓글 작성</CommentButton>
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
