import React from 'react';
import { TabHeaderContainer } from './styled';

const TabHeader = ({ children }) => {
  return (
    <React.Fragment>
      <TabHeaderContainer>{children}</TabHeaderContainer>
    </React.Fragment>
  );
};

export default TabHeader;
