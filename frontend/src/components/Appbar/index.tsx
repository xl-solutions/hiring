import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

import { useMenu } from 'context/menu/MenuContext';

import { Container } from './styled';

const AppBar: React.FC = () => {
  const { toggleMenu, pageName, showMenu } = useMenu();
  return (
    <Container>
      <div>
        {showMenu ? (
          <FaTimes size={40} onClick={toggleMenu} />
        ) : (
          <FaBars size={40} onClick={toggleMenu} />
        )}
        <span>{pageName}</span>
      </div>
    </Container>
  );
};

export default AppBar;
