import React from 'react';
import { StyledInputDate, StyledInputLabel } from './styled';

const InputDate = ({ value, onChange, placeholder, label }) => {
  return (
    <React.Fragment>
      <StyledInputLabel>
        {label}
        <StyledInputDate
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </StyledInputLabel>
    </React.Fragment>
  );
};

export default InputDate;
