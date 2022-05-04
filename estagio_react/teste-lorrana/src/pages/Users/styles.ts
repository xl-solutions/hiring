import styled from 'styled-components';
import device from '../../main/config/screens';

export const Container = styled.div`
  width: 100%;
  padding-left: 12px;

  h1{
    font-size: 24px;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 80%;
  margin-top: 20px;
  overflow-y: hidden;

  display: grid;
  grid-template-columns: 25% 25% 25% 25%;

  @media screen and (${device.mobileL}) {
        width: 100%;
        height: fit-content;
        padding: 10px;
        align-items: center;

        display:flex;
        flex-direction: column;
    }

`;
