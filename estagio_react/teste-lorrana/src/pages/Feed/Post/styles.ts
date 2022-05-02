import styled from 'styled-components';
import device from '../../../main/config/screens';

export const QuestionCard = styled.article`
    width: 60%;
    height: fit-content;
    padding: 10px;
    border-radius: 4px;
    background-color: var(--background);
    align-self: center;
    margin-bottom: 25px;

    @media screen and (${device.mobileL}) {
        width: 100%;
        height: fit-content;
        padding: 10px;
        align-items: center;

        display:flex;
        flex-direction: column;
    }
`;

export const PostAuthor = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content:space-between ;

    img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
    }
    .options{
      width: 20px;
      height:20px;

      :hover{
        cursor: pointer;
      }

    }
    .toggleOptions{
      width: 180px;
      height: 90px;
      background-color: var(--secondary);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 1px 1px 6px 0px gray;

      
    }
    
    .toggleOptions p {
      line-height: 2.2;

      :hover{
        cursor: pointer;
        border-bottom: solid 2px var(--primary) ;
      }
    }
`;

export const PostAndDescription = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    strong {
      font-size: 18px;
    }
    p {
      font-size: 16px;
      padding: 10px 5px;
      border-left: 2px solid var(--primary);
    }
`;

export const Comment = styled.div`
    margin-top: 10px;

    h1 {
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
      :hover {
        color: var(--primary);
      }
    }
    form {
      width: 100%;
      height: 60px;
      margin-top: 5px;
      display: flex;
      gap: 2px;

      @media screen and (${device.mobileL}) {
        width: 100%;
        height: fit-content;
        justify-content: center;

        background-color: red;

        display:flex;
        flex-direction: column;
      }

      textarea {
        flex: 1;
        align-self: center;
        height: 50px;

        @media screen and (${device.mobileL}) {
          width: 100%;
         align-self: center ;
        }
      }
      button{
        width: 100px;
        height: 40px;
        background-color: var(--primary);
        border-radius: 5px;
        align-self: center;
      }
      button:hover{
        cursor: pointer;
      }
    }
`;
