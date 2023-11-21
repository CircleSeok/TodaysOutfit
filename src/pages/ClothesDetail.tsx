import React from 'react';
import { useLocation } from 'react-router-dom';

const ClothesDetail: React.FC = () => {
  const location: any = useLocation();

  const { itemName, imageURL } = location.state;

  return (
    <div>
      <p>{itemName}</p>
      <img src={imageURL} alt={itemName} />
    </div>
  );
};

export default ClothesDetail;
