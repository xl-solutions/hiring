import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MenuLink = styled(Link)`
  cursor: pointer;
  width: 83px;
  height: 83px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: background 0.2s;
  text-decoration: none;
  width: 100%;
  color: #007eff;

  &:hover {
    background: #007eff;
    color: #fff;

    svg {
      color: #fff;
    }
  }

  svg {
    margin: 0 12px 0 22px;
    color: #007eff;
    transition: color 0.2s;
  }
`;
