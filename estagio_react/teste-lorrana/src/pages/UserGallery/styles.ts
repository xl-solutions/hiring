import styled from 'styled-components';

export const Header = styled.div`
  width: 100%;
  height: 90px;
  display: flex ;

  .img{
      width: 90px;
      height: 90px;
      border-radius: 50%;
  }
  h2{
      font-size: 22px;
      font-weight: 500;
      margin-left: 18px;
      margin-top: 6px;
  }

`;

export const Photos = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p{
    font-size: 14px;
    text-align:center ;
  }

  :hover{
    cursor: pointer;
    transition: 0.3;
  }
`;
