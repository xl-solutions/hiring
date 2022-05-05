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

export const Albums = styled.div`
  width:190px;
  height: 100%;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content:flex-start ;

  p{
    margin-top: 8px;
    color: var(--black);


    :hover{
      transition: 0.3s;
      border-bottom: solid 1px var(--primary);
    }
  }
`;
