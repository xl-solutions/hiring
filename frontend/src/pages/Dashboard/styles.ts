import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  .loading {
    width: 100%;
  }
`;

export const SearchContainer = styled.div`
  form {
    display: flex;
    align-items: center;

    input {
      padding: 12px;
      border-radius: 8px;
      outline: 0;
      border: 0;
      width: 300px;
      margin-right: 3px;
    }

    button {
      padding: 10px;
      margin: 3px;
      outline: 0;
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #6001d2;
      color: #fff;
      border-radius: 8px;
      transition: 0.2s;
      width: 125px;

      svg {
        margin-right: 5px;
      }

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

export const StockList = styled.ul`
  margin-top: 30px;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const StockItem = styled.li`
  padding: 15px;
  border-radius: 5px;
  position: relative;
  background-color: #fff;
  transition: 0.2s;
  margin: 5px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);

  > strong {
    font-size: 20px;
    font-weight: 500px;
  }

  > p {
    margin-top: 8px;
    font-size: 16px;

    span {
      margin-left: 3px;
      font-size: 14px;
    }
  }

  > div {
    margin-top: 10px;
    display: flex;
    align-items: center;

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
  }

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 5px;
    margin-right: 8px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: #333;
    }
  }

  &:hover {
    transform: translateY(-3px);
  }
`;
