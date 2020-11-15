import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  variant?: 'filled' | 'outlined';
  color?: string;
}

export const Container = styled.button<ContainerProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: #007eff;
  color: #fff;
  border: 0;
  font-weight: 600;
  font-size: 14px;
  margin-top: 14px;
  transition: background 0.2s;
  cursor: pointer;

  svg {
    margin-right: 12px;
  }

  &:hover {
    color: #fff;
    background: ${shade(0.3, '#007eff')};
  }

  ${(props) =>
    props.variant === 'filled' &&
    css`
      background-color: ${props.color ? props.color : '#007eff'};
      color: #fff;

      &:hover {
        background: ${shade(0.1, `${props.color || '#007eff'}`)};
      }
    `}

  ${(props) =>
    props.variant === 'outlined' &&
    css`
      border: 2px solid ${props.color ? props.color : '#007eff'};
      background: #fff;
      color: #007eff;
      transition: background 0.2s;

      &:hover {
        color: #fff;
        background: ${shade(0.1, `${props.color || '#007eff'}`)};
      }
    `}
`;
