import styled from 'styled-components'

export const Container = styled.div`
height: 100%;
color: #fff;
a{
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
}
a:hover{
  color: #456ae6;
}
h1{
  margin: 2vh 0;
  font-weight: bold;
}
p{
  margin-top: 10vh;
  font-size: 24px;
  line-height: 150%;
}
footer{
  display:flex;
  align-items: center;
  margin-top: 10vh;
  img{
    width: 7vw;
    height: 11vh;
    border-radius: 50%;
  }

  @media screen and (max-width: 900px){
    img{
      width: 20vw;
    }
  }
  span{
    margin-left: 1vw;
    font-size: 26px;
  }
}
`
