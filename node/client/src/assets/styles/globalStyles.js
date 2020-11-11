import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Roboto, Helvetica, Sans-Serif;
    color: #444;
  }

  h1, h2, h3, h4, ul, p, label {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  .container {
    max-width: 1140px;
    padding: 0 15px;
  }
`;

export default GlobalStyle;
