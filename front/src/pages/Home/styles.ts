import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  h1 {
    margin-top: 5vh;
    color: #fff;
    font-size: 46px;
  }
  span {
    color: #e63838;
  }
  form {
    margin-top: 5vh;
    display: flex;
    input {
      height: 7vh;
      width: 30vw;
      padding-left: 1vw;
      background-color: #39393f;
      border: none;
      border-radius: 5px 0 0 5px;
      color: #fff;
    }
    button {
      width: 10vw;
      background: linear-gradient(to top,#24102b,#7304f1);
      border: none;
      border-radius: 0 5px 5px 0;
      font-size: 18px;
      color: #fff;
      font-weight: bold;
    }
    @media screen and (max-width: 900px) {
      input{
        width: 70vw;
      }
      button {
        width: 15vw;
      }
    }
  }
`;
