import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Search = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 6px;
  max-width: 400px;
  align-self: center;
  color: var(--gray-light);
  position: relative;
  background-color: var(--gray);
  border-radius: 30px;

  div {
    display: flex;
    flex-direction: row;
  }

  input {
    width: 100%;
    color: var(--gray-light);
    border: none;
    outline: none;
    background-color: var(--gray);
    padding: 0 16px;
    margin-right: 16px;
  }

  .data-results {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    height: 200px;
    gap: 5px;
    left: 0;
    position: absolute;
    top: 110%;
    width: 100%;
    border-radius: 10px;
    background: var(--white);
    z-index: 1000;
    overflow: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .item {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    width: 100%;
    cursor: pointer;
    color: var(--gray);

    transition: all 0.2s;

    &:hover {
      color: var(--white);
      background: var(--blue);
    }

    p {
      margin: 15px 10px;
    }
  }
`;

export const IconSearch = styled.img`
  margin-right: 8px;
  color: var(--blue);
  font-size: 20px;
`;
