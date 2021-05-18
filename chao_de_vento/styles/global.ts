import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    box-sizing: border-box;
  }

  *,
  ::before,
  ::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: 'KoHo', sans-serif;
    line-height: 1.6;
    font-size: 1rem;
  }

  h1, h2, h3 {
    font-family: 'Girassol', cursive;
    text-align: center;
  }

  a {
  color: #0070f3;
  text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    display: block;
  }
`
