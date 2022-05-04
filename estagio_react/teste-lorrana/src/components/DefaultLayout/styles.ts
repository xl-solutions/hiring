import styled from 'styled-components';
import device from '../../main/config/screens';

export const Container = styled.div`
    width: 100vw;
    height: 100% ;
`;

export const Header = styled.div`
    width: 100vw;
    height: 90px;
    background-color: var(--primary);

    display: flex;
    justify-content: center;

    header{
        width: 1440px;
        height: 100% ;

        display: flex;
        align-items: center;
        justify-content: space-between ;

        .brand{
            width: 250px;
            height: 80px;

            display: flex;
            align-items: flex-end;

        }
        .logo{
            width: 65px;
            height: 80px;
            background-color: gray;
            margin-right: 10px;
        }
        .brand h2{
            color: var(--white);
            margin-bottom: 10px;
        }

        .userPicture{
            width: 65px;
            height: 60px;

            border-radius: 50%;
            background-color: gray ;
        }
    }
`;

export const ContentArea = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center ;
    
`;

export const Content = styled.div`
    width: 1440px;
    height: 100vh;

    display: grid;
    grid-template-columns: 30% 70%;

    @media screen and (${device.mobileL}) {
        width: 100%;
        height: fit-content;
        padding: 10px;
        align-items: center;

        display:flex;
        flex-direction: column;
    }
    .menuContainer{
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        padding-top: 30px;

        @media screen and (${device.mobileL}) {
            width: 90%;
            height: fit-content;
            padding: 10px;

            display:flex;
            flex-direction: column;
        }
    }

    .menu{
        width: 280px;
        height: 180px;
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;
        padding-bottom: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        background-color: var(--background);
    }

    .menu h2{
        margin-bottom: 10px;
        text-align: center;
        font-weight: 500;
        font-size: 22px;
        margin-top: 10px;
    }

    .menu p{
        font-size: 20px;
        line-height: 40px;
        margin-top: 5px;
    }

    .menu p:hover{
        cursor: pointer;
        border-bottom: solid 2px var(--primary);
    }

    .bodyContainer{
        background-color: var(--background);
        display: flex;
        flex-direction: column;

        padding-top: 20px;
        padding-left: 12px;
        padding-right: 12px;

        @media screen and (${device.mobileL}) {
            width: 90%;
            height: fit-content;
            padding: 6px;

            display:flex;
            flex-direction: column;
        }
    }

`;

export const Footer = styled.div``;