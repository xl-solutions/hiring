import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import Table from "../../components/Table";
import { route } from "../../services/api";
import { Header } from "./styles";

interface IGallery {
    userId: number,
    title: string
    thumbnailUrl: string
}

export function UserGallery(){
    const [photos, setPhotos ] = useState<IGallery[] | undefined>(undefined);
    const [error, setError] = useState('');
    const  {id} = useParams<{id?: string}>();

    useEffect(() => {
        loadPhotos();
      }, [photos]);
     

    const loadPhotos = async () => {
        try {
          const { data } = await route.photos.list(id??"")

          setPhotos(data);
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
                <Table title="Fotos" backButton={true}>
                    {photos?.length && photos.map((photos) => (
                        <img src={photos.thumbnailUrl} alt="imagem do usuário"/>
                    ))}
                </Table>
            </DefaultLayout>
        </>
    );
}

export default UserGallery;