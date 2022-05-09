import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 1480px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 15px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  justify-content: space-between;
  padding: 5px 0;

  input {
    text-align: right;
    width: 100px;
    padding: 5px;
    border-radius: 5px;
    border: none;
    color: var(--gray);
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--gray);
  border-radius: 10px;
  padding: 15px;

  div {
    h2 {
      margin-bottom: 10px;
    }
  }
`;

export const InfoStock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--gray);
  border-radius: 10px;
  padding: 15px;

  #company-name {
    font-size: 24px;
  }
  #price {
    font-size: 22px;
    margin: 5px 0;
  }
`;
