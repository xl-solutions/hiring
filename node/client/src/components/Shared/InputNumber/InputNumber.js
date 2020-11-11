import React from 'react';
import StyledInputNumber from './styled';

const InputNumber = ({ onChange, placeholder, value }) => {
  return (
    <StyledInputNumber
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputNumber;
