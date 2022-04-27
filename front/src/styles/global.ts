import { createGlobalStyle } from 'styled-components';

import GithubLogo from '../assets/GithubLogo.svg';

export default createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  outline: 0;
  list-style-type: none;
  background-size: cover;
}
body{
  background: #272424 url(${GithubLogo}) no-repeat 70% top;
  -webkit-font-smoothing: antialiased;
}
body, input, button{
  font-family: 'Roboto', sans-serif;
}
h1,h2,h3,h4,h5,h6,strong{
  font-weight: 500;
}
button {
    cursor: pointer;
  }

#root{
        margin: 0 auto;
        padding: 40px 20px;
}
`;
