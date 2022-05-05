import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { route } from "../../services/api";

import { Albums, Header } from "./styles";
import Photo from "../../main/assets/icons/photoProfile.png"
import Table from "../../components/Table";
import DefaultLayout from "../../components/DefaultLayout";

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
                    <img src={Photo} alt="Foto do usuário" className="img"></img>
                    <h2>{id}</h2>
                </Header>
                <Table title="Álbuns" backButton={false}>
                    {albums?.length && albums.map((album) =>(
                        <>
                            <Albums>
                                <Link to={`/albums/${album.id}/photos`}>
                                    <p>
                                        {album.title}
                                    </p>
                                </Link>
                            </Albums>
                        </>
                    ))}
                </Table>
            </DefaultLayout>
        </>
    );
}

export default UserAlbum;