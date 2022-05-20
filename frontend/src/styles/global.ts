import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {

        --blue: #0d6efd;
        --grey: #a0a6af;

        --text-title: #363f5f;
        --text-body: #969cb3;

        --background: #e7e7e7;
        --shape: #FFFFFF;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html{
        @media (max-width: 1080px){
            font-size: 93.75%;
        }
         @media(max-width: 720px){
             font-size: 87.5%;
         }
    }

    body {
        background: var(--background);
        /* -webkit-font-smoothing: antialiased */
    }

    body, input, button {
        font-family: sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4{
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }


    .react-modal-overlay{
        background: rgba(0,0,0,0.5);

        position: fixed;
        top:0;
        bottom: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .react-modal-content{
        width: 100%;
        height: 25rem;
        max-width: 70rem;
        background: var(--grey);
        padding: 3rem;
        position: relative;
        border-radius: 0.5rem;


        padding: 1rem 1rem;
        text-align: center;
        
    }
    .react-modal-close{
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        cursor: pointer;
    }

`
