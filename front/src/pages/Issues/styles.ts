import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: #fff;
  }
  a:hover {
    color: #456ae6;
  }
  header {
    width: 100%;
    color: #fff;
    font-size: 24px;
    h1 {
      font-weight: bold;
    }
  }
  ul {
    li {
      a {
        span {
          color: #ff02b3;
          font-weight: bold;
          margin-right: 0.5vw;
        }
      }
    }
  }
`;
