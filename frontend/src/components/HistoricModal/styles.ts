import styled from "styled-components";

export const ContainerModal = styled.div`
    display: flex;
    justify-content: center;

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

            display: block;
        }

        input{
            width: 70%;
            padding: 0 1rem;
            display: block;
            height: 2rem;
            border-radius: 0.20rem;
            border: 1px solid #d7d7d7;
            background: #e7e9ee;
            font-size: 1rem;
            margin-top: 1rem;
        }

        button[type="submit"] {
            width: 70%;
            padding: 0 1.5rem;
            height: 2rem;
            border-radius: 0.20rem;

        }

        
    }

    .all{
        display: flex;
    }

    .search{
        width: 50%;
        display: block;
    }

    .results{
        width: 80%;
        display: block;
    }

    .div-results{
        display: flex;
    }
`