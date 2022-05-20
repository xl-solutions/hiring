import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 0.2rem;

    div{
        background-color: var(--grey);
        padding: 1.5rem 1rem;
        border-radius: 0.5rem;
        color: white;

        header{
            display: flex;
            justify-content: left;
        }

        button{
            margin-top: 0.5rem;
            font-size: 1rem;
            color: #FFF;
            background: var(--blue);
            border: 0;
            padding: 0 1rem;
            border-radius: 0.25rem;
            height: 2rem;
        }

        input{
            width: 100%;
        }
    }

    .all{
        display: flex;
    }

    .search{
        width: 50%;
    }

    .results{
        width: 50%;
    }
`

