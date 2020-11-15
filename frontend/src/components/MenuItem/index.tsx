import React from 'react';
import { IconBaseProps } from 'react-icons';

import { MenuLink } from './styled';

interface MenuItemProps {
  icon?: React.ComponentType<IconBaseProps>;
  path: string;
  label: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  path,
  label,
  onClick,
}) => {
  return (
    <MenuLink to={path} onClick={onClick}>
      {Icon && <Icon size={25} />}
      <span>{label}</span>
    </MenuLink>
  );
};

export default MenuItem;
