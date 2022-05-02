import styled from 'styled-components';
import device from '../../main/config/screens';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const Header = styled.div`
  width: 80%;
  height: 90px;
  align-self: center;
  padding-top: 18px;

  h3{
      font-size: 16px;
      color: var(--secondary);
      justify-self: center;
  }

  h2{
      font-size: 22px;
      align-self: flex-end;
  }
`;

export const Content = styled.div`
   width: 80%;
   height: 80%;
   align-self: center;
   padding: 12px;
   overflow-y: auto;

   display: grid;
   grid-template-columns: 33% 33% 33%;
   justify-items: center ;

   border:solid 1px var(--secondary);
   border-radius: 5px;

   @media screen and (${device.mobileL}) {
        width: 100%;
        height: fit-content;
        padding: 10px;
        align-items: center;

        display:flex;
        flex-direction: column;
    }

   .data{
    width: 150px;
    height: 150px;

    background-color: purple;
    margin-bottom: 25px;

    @media screen and (${device.mobileL}){
        margin-bottom: 12px;
    }
   }

`;