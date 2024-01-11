import React, { useState } from 'react';
import styled from 'styled-components';
import RouterButton from './RouterButton';

const NavContainer = styled.nav`
  width: 1080px;
  font-size: 18px;
  ul {
    list-style: none;
    display: flex;
    /* align-items: center; */
    margin: 0;
    padding: 0;
    /* justify-content: space-between; */
  }
  li:last-child {
    margin-left: auto;
  }
  .dropdown {
    position: relative;
    display: inline-block;
    &:hover .dropdown-content {
      display: block;
    }
  }
  .dropbtn {
    background-color: transparent;
    color: #333;
    font-size: inherit;
    border: none;
    cursor: pointer;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .dropdown-content span {
    padding: 12px 16px;
    display: block;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
  }
  .active {
    background-color: #ccc;
  }
`;

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

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    setDropdownOpen(false);
  };

  // const handleNavigateToRecommendation = (recommendationType: string) => {
  //   switch (recommendationType) {
  //     case 'clothe':
  //       navigate('/clothesrecommend');
  //       break;
  //     case 'leisure':
  //       navigate('/leisurerecommend');
  //       break;
  //     case 'main':
  //     default:
  //       navigate('/');
  //       break;
  //   }
  // };

  return (
    <NavContainer>
      <ul>
        <li>
          <div
            className='dropdown'
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className='dropbtn'>{selectedCategory}</button>
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
        <li>
          <RouterButton />
        </li>
      </ul>
    </NavContainer>
  );
};

export default Navbar;
