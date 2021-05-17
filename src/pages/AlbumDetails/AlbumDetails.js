import React, { useState, useEffect, useCallback } from 'react';
import styles from './AlbumDetails.module.sass';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";


// import {
//     AlbumDetailsItem
//   } from '../../components/AlbumDetailsItem';

import request from '../../utils/request';

const AlbumDetails = (props) => {

    // this.props.match.params.user;

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [photos, setPhotos] = useState();

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    useEffect(() => {
        async function getPhotos(){
            const photos = await request({
                url: `/albums/${props.match.params.album}/photos`,
                method: 'GET',
            })
            setPhotos(photos.data);
        }
        getPhotos();
    }, []);

    var newPhotos = [];
    if(photos){
        photos.map(item => newPhotos.push({'src':item.url,'width': 1, 'height': 1}));
    }

    return(
        <>
        <main className="main-content" id="list">
            <h1 className="title">Thumbs</h1>

            <section>
                <div>
                <Gallery photos={newPhotos} onClick={openLightbox} />
                <ModalGateway>
                    {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                        currentIndex={currentImage}
                        views={newPhotos.map(x => ({
                            ...x,
                            srcset: x.srcSet,
                            caption: x.title
                        }))}
                        />
                    </Modal>
                    ) : null}
                </ModalGateway>
                </div>
            </section>
        </main>
        </>
    );
}

export default AlbumDetails;