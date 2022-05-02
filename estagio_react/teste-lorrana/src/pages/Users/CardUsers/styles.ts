import styled from 'styled-components';
import device from '../../../main/config/screens';

export const Container = styled.div`
  width: 100%;
  height: 80%;
  margin-top: 20px;

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

export const Card = styled.div`
  width: 170px;
  height: 200px;
  padding: 8px;
  display: flex;
  flex-direction:column;
  border-radius: 5px;
  :hover{
    cursor: pointer;
    background-color: var(--background);
    transition: 0.3s;
  }

  .img{
    width: 95px;
    height: 95px;
    border-radius: 50%;
    background-color: black;
    align-self: center;
  }

  p{
    font-size:18px;
    font-weight: 500;
    text-align: center;
    margin-top: 6px;
  }
`;
