import styled from 'styled-components';
import device from '../../../main/config/screens';

export const Card = styled.div`
  width: 170px;
  height: 100px;
  padding: 8px;
  display: flex;
  flex-direction:column;
  border-radius: 5px;
  justify-content: space-between;
  border: solid 1.5px var(--secondary);
  margin-bottom: 18px;

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

  h3{
    font-size: 16px;
    text-align: center;
  }

  p{
    font-size:16px;
    font-weight: 500;
    text-align: center;
    margin-top: 6px;
  }
`;
