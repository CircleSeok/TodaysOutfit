import styled from 'styled-components';

export const Container = styled.div`
  width: 1080px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  align-items: flex-start;

  @media (max-width: 720px) {
    width: 720px;
    h3 {
      font-size: 30px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  width: 100%;

  button {
    background-color: gray;
    font-size: 20px;
    font-weight: 900;
    color: white;
    width: 100px;
    height: 50px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &.active {
      background-color: #5383e8;
      color: white;
    }
  }

  @media (max-width: 720px) {
    button {
      width: 300px;
      height: 50px;
      font-size: 30px;
    }
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ItemWrapper = styled.div`
  width: calc(25% - 10px);
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px) scale(1);
  }

  img {
    height: 250px;
    width: 250px;
    object-fit: cover;
    border: 1px solid #999;
    border-radius: 20px;
  }

  @media (max-width: 720px) {
    width: calc(50% - 10px);
    margin-bottom: 30px;

    p {
      margin-top: 5px;
    }

    img {
      height: 300px;
      width: 90%;
    }

    font-size: 25px;
  }
`;
