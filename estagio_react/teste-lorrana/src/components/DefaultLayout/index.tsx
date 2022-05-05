import { FC, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import Profile from '../../main/assets/icons/profile.png'
import { Container, Content, ContentArea, Header } from "./styles";

interface DivProps extends HTMLAttributes<DivProps>{
    children: any
}

export const DefaultLayout: FC<DivProps> =({children}: DivProps) => {

    return(
        <Container>
            <Header>
                <header>
                    <div className="brand">
                        <div className="logo">
                            <h1>
                                <span className="logoLetter">i</span>C
                            </h1>
                        </div>
                        <h2>inContact</h2>
                    </div>
                    <img src={Profile} className="userPicture" alt="Imagem de Perfil"/>
                          
                </header>
            </Header>
            <ContentArea>
                <Content>
                    <div className="menuContainer">
                        <div className="menu">
                            <h2>O que deseja ver?</h2>
                            <Link to='/'>
                                <p>Feed</p>
                            </Link>
                            <Link to='/users'>
                                <p>Usuários</p>
                            </Link>
                        </div>
                    </div>
                    <div className="bodyContainer">
                        {children}
                    </div>
                </Content>
            </ContentArea>
        </Container>
    );
};

export default DefaultLayout;