import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root{
        --primary: #86C5E9;
        --secondary: #E8E8E8;
        --background: #5E526E12;
        --black: #000000;
        --white: #ffffff;
    }

    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    ::-webkit-scrollbar {
        width: 3px;
        border-radius: 15px;
        background-color: var(--background);
    }
    ::-webkit-scrollbar-track{
        background-color: var(--background);
    }
    ::-webkit-scrollbar-thumb{
        background: var(--primary);
        border-radius: 15px;
    }
`;

export default GlobalStyles;
