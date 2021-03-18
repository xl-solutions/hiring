import styled from 'styled-components';

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 3px;
    background-color: white;
    padding: 15px;
    width: 300px;
    height: 150px;

    input{
        height: 25px;
        border-radius: 4px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
    }

    button{
        cursor: pointer;
        border-radius: 6px;
        border: none;
        outline: none;
        font-weight: bold;
        height:40px;
        width:100%;
        background-color: #00d166;
        color: white;
        transition: .2s ease all;

        &:hover{
            background-color: #14e379;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
            transition: .3s ease all;
        }
    }
`;