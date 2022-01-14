import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #FAFAFA;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px #232129 solid;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #3F51B5;
      border-color: #3F51B5;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #3F51B5;
    `}



  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: rgba(0, 0, 0, 0.54);

    &::placeholder {
      color: #666360;
    }
  }

  .sss:focus {
    border: none!important
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;

    &:before {
      border-color: #c53030 transparent;
    }
  }
`;
