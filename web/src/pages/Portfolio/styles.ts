import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: var(--gray);
  border-radius: 4px;
`;

export const ProductTable = styled.table`
  width: 100%;
  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }
  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  img {
    height: 100px;
  }
  strong {
    color: var(--white);
    display: block;
  }
  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  button {
    background: none;
    border: 0;
    padding: 6px;
    svg {
      color: var(--blue);
      transition: color 0.2s;
    }
    &:hover {
      svg {
        color: ${darken(0.06, '#008FFB')};
      }
    }
    &:disabled {
      svg {
        color: ${lighten(0.25, '#008FFB')};
        cursor: not-allowed;
      }
    }
  }
`;
