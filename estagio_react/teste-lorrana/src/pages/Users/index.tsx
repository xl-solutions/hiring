import { useEffect, useState } from "react";
import { route } from "../../services/api";
import { Container, Content } from "./styles";
import DefaultLayout from "../../components/DefaultLayout";
import CardUsers from "./CardUsers";
import { Link } from "react-router-dom";

interface IUsers{
    id: string,
    name: string,
    username: string
}

export function Users(){

    const[users, setUsers ] = useState<IUsers[] | undefined>(undefined);
    const[error, setError ] = useState('');

    useEffect(() => {
        loadUsers();
      }, [users]);

    const loadUsers = async () => {
        try {
            const { data } = await route.users.list();
  
            setUsers(data);
          } catch (error: any) {
            console.log(error);
            setError(error.message);
          }
    };

    return(
        <>
            <DefaultLayout>
                <Container>
                    <h1>Usuários</h1>
                        <Content>
                            {users?.length && users.map((user) => (
                                <>
                                    <Link to={`/users/${user.id}/albums`}>
                                        <CardUsers {...user}/>
                                    </Link>
                                </>
                            ))}
                        </Content>   
                </Container>
            </DefaultLayout>
        </>
    );
}

export default Users;