import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1480px;
  height: 80px;
  margin: 0 auto;
  margin-top: 16px;
  align-items: center;
`;

export const Logo = styled(Link)`
  color: var(--white);
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;

  span {
    color: var(--blue);
    margin-left: 4px;
  }
`;

export const Portfolio = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #fff;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
`;
