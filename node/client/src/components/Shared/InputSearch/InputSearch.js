import React from 'react';
import StyledInputSearch from './styled';

const InputSearch = ({ onChange, placeholder, value }) => {
  return (
    <StyledInputSearch
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputSearch;
