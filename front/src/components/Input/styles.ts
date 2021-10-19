import { cssVar, shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  input {
    padding: 14px 10px;
    margin-right: 14px;
    flex: 1;
    max-width: 300px;
    border-radius: 5px;
    box-shadow: 0.3px 0.3px 0.3px 0.01px;
    color: var(--shape);
    background: var(--red);
    border: none;
    color: var(--shape);
    &::placeholder {
      color: var(--shape);
    }
    &:hover & + div {
      margin-top: 8px;
    }
    ${(props): any => props.isFocused && css`
        border: none;
        resize: none;
        outline: none;
        color: ${shade(0.16, String(cssVar('--shape')))}
      `}
  }
  @media (max-width: 701px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;
