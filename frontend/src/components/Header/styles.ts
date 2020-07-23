import styled from 'styled-components';

export const Container = styled.div`
  background: #6001d2;
  padding: 30px 0;

  header {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
    }

    svg {
      color: #fff;
      height: 30px;
      width: 30px;
    }

    h1 {
      margin-left: 5px;
      font-size: 30px;
      color: #fff;
    }

    .back-button {
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        color: #ddd;
      }
    }
  }
`;
