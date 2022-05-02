import { FC, HTMLAttributes } from "react";
import { Container, Content, Header } from "./styles";

interface DivProps extends HTMLAttributes<DivProps>{
    children: any,
    title: string,
    backButton?: boolean
}

export const Table: FC<DivProps> =({ children, title, backButton}: DivProps) => {

    return(
        <Container>
            <Header>
                {backButton ? (
                    <h3>&#10094; Voltar</h3>
                ): (
                    ''
                )}
                <h2>{title}</h2>
            </Header>
            <Content>
                <div className="data"></div>
                <div className="data"></div>
                <div className="data"></div>
                <div className="data"></div>
                <div className="data"></div>
                <div className="data"></div>
                <div className="data"></div>
                <div className="data"></div>
                <div className="data"></div>
                <div className="data"></div>
                <div className="data"></div>
            </Content>
        </Container>
    );
};

export default Table;