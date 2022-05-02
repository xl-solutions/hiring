import { FC, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { Container, Content, ContentArea, Footer, Header } from "./styles";


interface DivProps extends HTMLAttributes<DivProps>{
    children: any
}

export const DefaultLayout: FC<DivProps> =({children}: DivProps) => {

    return(
        <Container>
            <Header>
                <header>
                    <div className="brand">
                        <div className="logo"></div>
                        <h2>inContact</h2>
                    </div>
                    <div className="userPicture">
                            
                    </div>   
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
            <Footer>
            </Footer>
        </Container>
    );
};

export default DefaultLayout;