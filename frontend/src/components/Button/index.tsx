import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';

import { Container } from './styled';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined';
  color?: string;
  icon?: React.ComponentType<IconBaseProps>;
  iconSize?: number;
}

const Button: React.FC<ButtonProps> = ({
  color,
  variant,
  children,
  icon: Icon,
  iconSize = 20,
  ...rest
}) => {
  return (
    <Container color={color} variant={variant} type="button" {...rest}>
      {Icon && <Icon size={iconSize} />}
      {children}
    </Container>
  );
};

export default Button;
