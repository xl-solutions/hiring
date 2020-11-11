import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../../assets/styles/components/Container';
import { MenuHeader, MenuList, MenuListLink } from './styled';

const Menu = () => {
  return (
    <MenuHeader>
      <Container>
        <MenuList>
          <MenuListLink>
            <Link to="/">Onboarding</Link>
          </MenuListLink>
          <MenuListLink>
            <Link to="/home">Home</Link>
          </MenuListLink>
          <MenuListLink>
            <Link to="/portfolio">Portfólio</Link>
          </MenuListLink>
        </MenuList>
      </Container>
    </MenuHeader>
  );
};

export default Menu;
