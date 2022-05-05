import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { route } from "../../services/api";

import { Header, Photos } from "./styles";
import DefaultLayout from "../../components/DefaultLayout";
import Table from "../../components/Table";
import Photo from "../../main/assets/icons/photoProfile.png"
import PhotoView from "../../components/PhotoView";

interface IGallery {
    userId: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export function UserGallery(){
    const [photos, setPhotos ] = useState<IGallery[] | undefined>(undefined);
    const [error, setError] = useState('');
    const [showPhotos, setShowPhotos] = useState(false)
    const  {id} = useParams<{id?: string}>();

    useEffect(() => {
        loadPhotos();
      }, [photos]);
     
    const handleClose = () =>{
        setShowPhotos(false)
    }

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
            {showPhotos && 
                <PhotoView handleClose={handleClose}>
                    {photos?.length && photos.map((photo) => (
                        <img src={photo.url} alt="Imagem"/>
                    ))}
                </PhotoView> 
            }
            <DefaultLayout>
                <Header>
                    <img src={Photo} alt="Foto do usuário" className="img"/>
                    <h2>{id}</h2>
                </Header>
                <Table title="Fotos" backButton={true}>
                    {photos?.length && photos.map((photo) => (
                        <Photos>
                            <img src={photo.thumbnailUrl} alt="imagem do usuário" onClick={() => setShowPhotos(!showPhotos)}/>
                            <p>{photo.title}</p>
                        </Photos>
                    ))}
                </Table>
            </DefaultLayout>
        </>
    );
}

export default UserGallery;