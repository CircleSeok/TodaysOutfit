import React, { useState, ChangeEvent, FormEvent } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

interface FormData {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

const initialFormData: FormData = {
  id: uuidv4(),
  name: '',
  category: '',
  imageURL: '',
  description: '',
};

const AddClothesForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const db = getFirestore();
      const clothesCollection = collection(db, 'TodaysOutfit/clothes');

      await addDoc(clothesCollection, formData);

      setFormData({
        id: uuidv4(),
        name: '',
        category: '',
        imageURL: '',
        description: '',
      });

      console.log('데이터가 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('데이터 추가 중 에러 발생:', error);
    }
  };

  return (
    <div>
      <h2>옷 추가하기</h2>
      <form onSubmit={handleSubmit}>
        <label>
          이름:
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          종류:
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          이미지 주소:
          <input
            type='text'
            name='imageURL'
            value={formData.imageURL}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          설명:
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type='submit'>추가</button>
      </form>
    </div>
  );
};

export default AddClothesForm;
