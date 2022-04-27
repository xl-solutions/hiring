import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 7vh;
  header {
    display: flex;
    align-items:center;
    img {
      height: 30vh;
      border-radius: 50%;
    }
    span {
      margin-left: 3vw;
      font-size: 40px;
      color: #fff;
    }
  }
  ul{
    li{
      display: flex;
      flex-direction: column;
      align-items: start;
      border: 1px solid #fff;
      margin: 2vh 0;
      border-radius: 15px;
      line-height: 150%;
      a{
        cursor: pointer;
        font-size: 36px;
        color: #fff;
        font-weight: bold;
        margin-top: 2vh;
        svg{
          margin-right: 0.5vw;
        }
      }
      a:hover{
        color: #456ae6;
      }
      label{
        font-weight: bold;
        color: #ff02b3;
        margin-top: 2vh;
        a{
          font-size: 16px;
          font-weight: normal;
          margin: 0 0.5vw;
        }
        span{
          color: #fff;
          font-weight: normal;
          margin: 0 0.5vw;
        }
        svg{
          color: #fff;
          cursor: pointer;
        }
      }
      label+label{
        color: #980bb4;

      }
    }
  }
`;
