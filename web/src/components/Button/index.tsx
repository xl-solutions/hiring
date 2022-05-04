import { ButtonHTMLAttributes } from 'react';

import { ButtonStyle } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading?: boolean;
}

export function Button({ isLoading, label, ...rest }: ButtonProps) {
  return (
    <>
      <ButtonStyle
        className="button"
        isLoading={isLoading}
        disabled={isLoading}
        {...isLoading}
        {...rest}
      >
        {!!isLoading && <i className="fa fa-circle-o-notch fa-spin" />}
        {isLoading ? 'Carregando' : label}
      </ButtonStyle>
    </>
  );
}
