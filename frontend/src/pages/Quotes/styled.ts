import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 22px;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .form-container-parent {
    width: 100%;
    max-width: 360px;

    @media (max-width: 768px) {
      max-width: 100%;
    }
  }

  .quotes-container {
    background: #edfdfd;
    flex: 1;
    margin-left: 22px;
    margin-bottom: 12px;
    border-radius: 8px;
    min-height: 400px;
    box-shadow: 0px 3px 8px -3px #000;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: 768px) {
      margin-left: 0;
      margin-top: 12px;
    }
  }
`;

export const FormContainer = styled.form`
  display: flex;
  align-items: center;

  border-radius: 8px;
  background: #edfdfd;
  height: 400px;
  box-shadow: 0px 3px 8px -3px #000;

  > div {
    padding: 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const QuotesContainer = styled.div`
  padding: 12px;
`;
