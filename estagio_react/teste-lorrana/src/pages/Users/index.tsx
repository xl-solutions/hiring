import DefaultLayout from "../../components/DefaultLayout";
import CardUsers from "./CardUsers";
import { Container } from "./styles";

export function Users(){
    return(
        <>
            <DefaultLayout>
                <Container>
                    <h1>Usuários</h1>
                    <CardUsers/>
                </Container>
            </DefaultLayout>
        </>
    );
}

export default Users;