import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    background: var(--orange);
    height: 44px;
    margin-bottom: 14px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    margin-right: 14px;
    color: var(--text-black);
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;
    &:hover {
      ${(): any => css`
        background-color: ${shade(0.16, '#ff9000')};
      `}
    }
  }

  @media (max-width: 701px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;
