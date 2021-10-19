import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`:root {
    --red: #e52e4d;
    --green: #33cc95;
    --blue: #5429cc;
    --text-body: #969cb3;
    --animation: rgb(248, 156, 107);
    --text-black: #000000;
    --orange: #ff9000;
    --shape: #ffffff;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1080px;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html {
    @media (min-width: breakpoint-lg) {
        width: 93.75%;
    }
    @media (min-width: breakpoint-md) {
        width: 87.5%;
    }
    @media (min-width: breakpoint-sm) {
        width: 81.25%;
    }
}
body {
    background: var(--background);
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}
body,
input,
button,
textarea {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
}
h1,
h2,
h3,
h4,
h5,
h6,
strong {
    font-weight: 600;
}
button {
    cursor: pointer;
}
[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
}
`;
export default GlobalStyle;
