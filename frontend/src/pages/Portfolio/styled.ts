import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 22px;

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 90%;
    background: #edfdfd;
    width: 100%;
    min-height: 400px;
    border-radius: 8px;
    overflow-x: auto;

    svg {
      cursor: pointer;
      color: red;
    }
  }

  td,
  th {
    text-align: left;
    padding: 8px;
    cursor: pointer;
  }

  tr {
    transition: 0.2s all;

    &:hover {
      background-color: #ccedff;
    }
  }

  tr:nth-child(even) {
    background-color: #ccedff;

    &:hover {
      background-color: #aadefb;
    }
  }

  td:last-child {
    text-align: center;
  }

  th:last-child {
    text-align: center;
  }
`;
