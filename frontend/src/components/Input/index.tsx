import React, { RefObject } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error: string | undefined;
  maxLength?: number;
  icon?: React.ComponentType<IconBaseProps>;
  register: any;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  register,
  error,
  icon: Icon,
  maxLength,
  ...rest
}) => {
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        ref={register}
        maxLength={maxLength}
        {...rest}
      />
    </Container>
  );
};

export default Input;
