import React from 'react';
import { useLocation } from 'react-router-dom';

const LeisureDetail: React.FC = () => {
  const location: any = useLocation();

  const { itemName, imageURL, itemDescription } = location.state;

  return (
    <div>
      <p>{itemName}</p>
      <img src={imageURL} alt={itemName} />
      <p>{itemDescription}</p>
      {/* 이런 여가 들도 있어요
      4개 랜덤으로 */}
      {/* 댓글 인풋 */}
      {/* 댓글영역 */}
    </div>
  );
};

export default LeisureDetail;
