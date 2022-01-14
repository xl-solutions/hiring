import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled(animated.div)`
  position: relative;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 8px;
  }
`;
