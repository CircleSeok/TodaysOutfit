import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { AllLeisureData } from '../api/firebase';
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
import { LeisureItem } from '../types/LeisureItem';

const LeisureDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemName, imageURL } = location.state;
  const [randomLeisures, setRandomLeisures] = useState<LeisureItem[]>([]);

  const { comments, commentText, handleCommentChange, onSubmitComment } =
    useComments('leisure', itemName);

  useEffect(() => {
    const fetchRandomLeisures = async () => {
      try {
        const leisureData = await AllLeisureData();

        const randomIndexes = getRandomIndexes(leisureData.length, 4);
        const selectedLeisure = randomIndexes.map(
          (index) => leisureData[index]
        );

        setRandomLeisures(selectedLeisure);
      } catch (error) {
        console.log('패치 에러', error);
      }
    };
    fetchRandomLeisures();
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

  const handleItemClick = (item: LeisureItem) => {
    navigate(`/leisurerecommend/${encodeURIComponent(item.name)}`, {
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

      <h3>추천 레저</h3>
      <ClothesContainer>
        {randomLeisures.map((item) => (
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
          placeholder='댓글을 입력하세요'
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

export default LeisureDetail;
