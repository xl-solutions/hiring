import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
      --white: #FFFFFF;
      --green: #68F4A9;
      --black: #000000;
      --blue: #008FFB;
      --blue-dark: #0B3A5E;
      --gray-light: #f2f2f2;
      --gray-dark: #252731;
      --blue-light: #E7EFFF;
      --orange: #ff5f52;
      --red-dark: #AB4245;
      --gray: #252728;
      --gray-medium: #161819;
  }
  
  * {
    margin: 0;
    padding: 0;
    outline: 0;
  }

  body {
    background-color: #191920; 
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
    color: #FFFFFF;
  }

  #root {
    max-width: 1480px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }  
`;