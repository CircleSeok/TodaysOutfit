import React, { useState } from 'react';
import useWeatherStore from '../store/WeatherStore';

interface NavbarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const user = useWeatherStore((state) => state.user);
  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    setDropdownOpen(false);
  };

  return (
    <nav>
      <ul>
        <li>
          <div className='dropdown'>
            <button
              className='dropbtn'
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              {selectedCategory}
            </button>
            {isDropdownOpen && (
              <div className='dropdown-content'>
                {categories.map((category, index) => (
                  <span
                    key={index}
                    onClick={() => handleCategoryChange(category)}
                    className={selectedCategory === category ? 'active' : ''}
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>
        </li>
        {/* <li>{메인페이지 버튼}</li> */}
        <li>
          <div>
            <span>{user?.displayName}</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
