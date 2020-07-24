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

export const CardContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  max-width: 480px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  position: relative;

  svg {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 15px;
    margin-right: 25px;
    width: 20px;
    height: 20px;
    color: #333;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.2s;

    & + div {
      margin-top: 10px;
    }

    strong {
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    span {
      margin-top: 8px;
      font-size: 14px;
      color: #666;
    }

    .gains {
      margin-top: 10px;
      font-size: 16px;
    }

    .positive {
      color: #12a454;
    }

    .negative {
      color: #e83f5b;
    }

    &:hover {
      transform: translateX(3px);
    }
  }
`;
