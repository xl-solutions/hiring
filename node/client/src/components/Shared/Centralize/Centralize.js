import React from 'react';
import { StyledCentralize } from './styled';

const Centralize = ({ children }) => {
  return (
    <React.Fragment>
      <StyledCentralize>{children}</StyledCentralize>
    </React.Fragment>
  );
};

export default Centralize;
