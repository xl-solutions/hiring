import DefaultLayout from "../../components/DefaultLayout";
import Table from "../../components/Table";
import { Header } from "./styles";

export function UserAlbum(){
    return(
        <>
            <DefaultLayout>
                <Header>
                    <div className="img"></div>
                    <h2>Maria Ana</h2>
                </Header>
                <Table title="Álbum" backButton={false}>
                
                </Table>
            </DefaultLayout>
        </>
    );
}

export default UserAlbum;