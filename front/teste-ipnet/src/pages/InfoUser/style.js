import styled from 'styled-components';

export const LogoRepo = styled.img`
    height: 50px;
    margin: 10px;
`;

export const TitleOwner = styled.h3`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 22pt;
    color: white;
    position: center;
    text-align: center;
`;

export const AvatarImg = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 75px;
`;

export const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0;
    margin: 0;
`;

export const NameTag = styled.h1`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: lighter;
    color: black;
    padding: 30px;
    font-size: 22pt;
`;

export const Navbar = styled.div`
    display: flex;
    background-color: #24292E;
    height: 100px;
    justify-content: center;
    align-items: center;
`;

export const Repositorios = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        margin:15px;
        width: 1000px;
        padding: 15px;
        background-color: white;

        strong{
            color: black;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
    }

    p{
            color: black;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
`;
