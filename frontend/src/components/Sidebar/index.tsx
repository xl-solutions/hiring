import React from 'react';

import { Container } from './styled';
import { useMenu } from '../../context/menu/MenuContext';

const Sidebar: React.FC = ({ children }) => {
  const { showMenu } = useMenu();
  return <Container showMenu={showMenu}>{children}</Container>;
};

export default Sidebar;
