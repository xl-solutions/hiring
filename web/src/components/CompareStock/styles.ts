import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 1480px;
  grid-template-columns: 1fr 3fr;
  grid-gap: 15px;
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

    #stock-compare {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 13px;
      font-weight: bold;
      padding: 5px 10px;
      background-color: var(--blue);
      color: var(--white);
      margin: 5px 0;

      button {
        text-decoration: none;
        border: none;
        background-color: transparent;
      }
    }
  }
`;

export const IconDelete = styled.img`
  margin-right: 8px;
  color: var(--gray);
  font-size: 20px;
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
