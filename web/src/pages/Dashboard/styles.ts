import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1480px;
  margin: 24px 0;
`;

export const GeneralInfo = styled.div`
  display: grid;
  width: 100%;
  max-width: 1480px;
  grid-template-columns: 3fr 1fr;
  grid-gap: 15px;
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

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  justify-content: space-between;
  padding: 5px 0;

  input {
    width: 100px;
    padding: 4px;
    border-radius: 5px;
    border: none;
    color: var(--gray);
  }
`;

export const ProjectionGains = styled.div`
  display: grid;
  width: 100%;
  max-width: 1480px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 15px;
`;

export const CompareStock = styled.div`
  display: grid;
  width: 100%;
  max-width: 1480px;
  grid-template-columns: 1fr 3fr;
  grid-gap: 15px;
`;

export const IconDelete = styled.img`
  margin-right: 8px;
  color: var(--gray);
  font-size: 20px;
`;
