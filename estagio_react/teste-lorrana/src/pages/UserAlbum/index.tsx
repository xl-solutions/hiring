import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import Table from "../../components/Table";
import { route } from "../../services/api";
import { Header } from "./styles";

interface IAlbum {
    id: string,
    userId: number,
    title: string
    
}

export function UserAlbum(){
    const [albums, setAlbums ] = useState<IAlbum[] | undefined>(undefined);
    const [error, setError] = useState('');
    const  {id} = useParams<{id?: string}>();

    useEffect(() => {
        loadAlbums();
      }, []);
     

    const loadAlbums = async () => {
        try {
          const { data } = await route.albums.list(id??"");
          setAlbums(data);
        } catch (error: any) {  
          console.log(error);
          setError(error.message);  
        }
      };


    return(
        <>
            <DefaultLayout>
                <Header>
                    <div className="img"></div>
                    <h2>{id}</h2>
                </Header>
                <Table title="Álbum" backButton={false}>
                    {albums?.length && albums.map((album) =>(
                        <>
                            <Link to={`/albums/${album.id}/photos`}>
                                <div className="album">
                                    {album.title}
                                </div>
                            </Link>
                        </>
                    ))}
                </Table>
            </DefaultLayout>
        </>
    );
}

export default UserAlbum;