import React from 'react';
import StyledButton from './styled';

const Button = ({ backgroundColor, children, onClick, margin, color }) => {
  return (
    <StyledButton onClick={onClick} style={{ backgroundColor, margin, color }}>
      {children}
    </StyledButton>
  );
};

export default Button;
