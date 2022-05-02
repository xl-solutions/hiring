import { Link } from "react-router-dom";
import { Card, Container } from "./styles";

export function CardUsers(){
    return(
        <>
            <Container>
                <Link to="/user/album">
                    <Card>
                        <div className="img"></div>
                        <p>Ruan Limassssssss ssssssssss</p>
                    </Card>
                </Link>
                <Card>
                    <div className="img"></div>
                    <p>Ruan Limassssssss ssssssssss</p>
                </Card>
                <Card>
                    <div className="img"></div>
                    <p>Ruan Limassssssss ssssssssss</p>
                </Card>
                <Card>
                    <div className="img"></div>
                    <p>Ruan Limassssssss ssssssssss</p>
                </Card> <Card>
                    <div className="img"></div>
                    <p>Ruan Limassssssss ssssssssss</p>
                </Card>
                <Card>
                    <div className="img"></div>
                    <p>Ruan Limassssssss ssssssssss</p>
                </Card>
            </Container>
        </>
    );
}

export default CardUsers;