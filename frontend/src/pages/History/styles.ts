import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  > strong {
    font-size: 28px;
    margin-left: 10px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  input {
    padding: 12px;
    border-radius: 8px;
    outline: 0;
    border: 0;
    width: 180px;
    margin-right: 10px;
  }

  button {
    padding: 10px;
    margin: 3px;
    outline: 0;
    border: 0;
    display: flex;
    align-items: center;
    background-color: #6001d2;
    color: #fff;
    border-radius: 5px;
    transition: 0.2s;

    svg {
      margin-right: 5px;
    }

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const TableContainer = styled.div`
  margin-top: 30px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #333;
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
