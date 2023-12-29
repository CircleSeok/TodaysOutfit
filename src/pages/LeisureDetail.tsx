import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AllLeisureData } from '../api/firebase';
import styled from 'styled-components';
import { useComments } from '../hooks/CommenUtils';
import { LeisureItem } from '../components/Leisure';

const Container = styled.div`
  width: 1080px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 720px) {
    width: 720px;
  }
`;

const MainImgWrap = styled.div`
  width: 60%;
  height: 690px;
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

const InputWrap = styled.form`
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
`;

const CommentItem = styled.div`
  border: 1px solid black;
  margin-bottom: 10px;
  width: calc(50% - 5px);
  box-sizing: border-box;
`;

const LeisureDetail: React.FC = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const { itemName, imageURL, itemDescription } = location.state;
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
      {/* <p>{itemDescription}</p> */}

      <h3>추천 레저</h3>
      <ClothesContainer>
        {randomLeisures.map((item, index) => (
          <Test key={index} onClick={() => handleItemClick(item)}>
            <img src={item.imageURL} alt={item.name} />
            <p>{item.name}</p>
          </Test>
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
