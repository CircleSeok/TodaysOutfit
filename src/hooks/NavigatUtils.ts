import { useNavigate } from 'react-router-dom';

const useNavigateUtil = () => {
  const navigate = useNavigate();

  const handleNavigate = (recommendationType: string) => {
    switch (recommendationType) {
      case 'clothe':
        navigate('/clothesrecommend');
        break;
      case 'leisure':
        navigate('/leisurerecommend');
        break;
      case 'main':
      default:
        navigate('/');
        break;
    }
  };

  return { handleNavigate };
};

export default useNavigateUtil;
