import React, { useContext, useEffect, useState } from 'react'
import { UserFileContext } from '../contexts'
import { ButtonAlbums, ContainerCard } from './styles'
import { User } from '../../@types/types'
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineComment,
} from 'react-icons/ai'
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs'
import { HiOutlinePhotograph } from 'react-icons/hi'
import Carousel, { ModalGateway, Modal } from 'react-images'

const UserCard = () => {
  const [viewer, setViewer] = useState({
    selected: 0,
    visible: false,
  })
  const {
    users,
    photos,
    callAlbuns,
    albuns,
    posts,
    selectedEnum,
    callPhotos,
    callPosts,
    comments,
    callComments,
    deletePost,
  } = useContext(UserFileContext)
  const files = []

  const handleViewer = (selected: any) =>
    setViewer({ selected, visible: !viewer.visible })

  return (
    <>
      {selectedEnum === 'users' &&
        users &&
        users.map((user: User, index: number) => (
          <ContainerCard key={`cv-${index}-${user.address.city}`}>
            <span>{`ID: ${user.id}`}</span>
            <span>{`Nome: ${user.name}`}</span>
            <span>{`Telefone: ${user.phone}`}</span>
            <span>{`Cidade: ${user.address.city}`}</span>
            <span>{`Latitude: ${user.address.geo.lat}`}</span>
            <span>{`Longitude: ${user.address.geo.lng}`}</span>
            <span>{`Nickname: ${user.username}`}</span>
            <span>{`Nickname: ${user.website}`}</span>
            <div>
              <ButtonAlbums onClick={() => callAlbuns(user.id)}>
                <HiOutlinePhotograph />
                <span>Albuns</span>
              </ButtonAlbums>
              <ButtonAlbums onClick={() => callPosts(user.id)}>
                <BsReverseLayoutTextSidebarReverse />
                <span>Posts</span>
              </ButtonAlbums>
            </div>
          </ContainerCard>
        ))}
      {selectedEnum === 'albuns' &&
        albuns &&
        albuns.map((album) => (
          <ContainerCard key={`cv-${album.id}-${album.title}`}>
            <span>{`ID: ${album.id}`}</span>
            <span>{`Título: ${album.title}`}</span>
            <span>{`ID do Usuário: ${album.userId}`}</span>
            <div>
              <ButtonAlbums onClick={() => callPhotos(album.userId)}>
                <HiOutlinePhotograph />
                <span>Fotos</span>
              </ButtonAlbums>
            </div>
          </ContainerCard>
        ))}
      {selectedEnum === 'photos' &&
        photos &&
        photos.map((photo, index) => (
          <ContainerCard
            key={`cv-${photo.albumId}-${photo.title}`}
            onClick={(e) => {
              e.preventDefault()
              handleViewer(index)
              // console.log(index)
            }}
          >
            <img src={photo.thumbnailUrl} alt="" />
            <span>{`ID: ${photo.id}`}</span>
            <span>{`Título: ${photo.title}`}</span>
            {files.push({ source: photo.url, id: index })}
          </ContainerCard>
        ))}
      {files && (
        <ModalGateway>
          {viewer.visible && (
            <Modal onClose={handleViewer}>
              <Carousel views={files} currentIndex={viewer.selected} />
            </Modal>
          )}
        </ModalGateway>
      )}
      {selectedEnum === 'posts' &&
        posts &&
        posts.map((post) => (
          <ContainerCard key={`cv-${post.id}-${post.title}`}>
            <span>{`ID: ${post.id}`}</span>
            <span>{`Título${post.title}`}</span>
            <span>{`Corpo: ${post.body}`}</span>
            <div>
              <ButtonAlbums onClick={() => deletePost(post.id)}>
                <AiOutlineDelete />
                <span>Remover</span>
              </ButtonAlbums>
              <ButtonAlbums>
                <AiOutlineEdit />
                <span>Editar</span>
              </ButtonAlbums>
              <ButtonAlbums onClick={() => callComments(post.id)}>
                <AiOutlineComment />
                <span>Comentários</span>
              </ButtonAlbums>
            </div>
          </ContainerCard>
        ))}
      {selectedEnum === 'comments' &&
        comments &&
        comments.map((comment) => (
          <ContainerCard key={`cv-${comment.id}-${comment.name}`}>
            <span>{`ID: ${comment.id}`}</span>
            <span>{`ID do Post: ${comment.postId}`}</span>
            <span>{`Nome: ${comment.name}`}</span>
            <span>{`Email: ${comment.email}`}</span>
            <span>{`Comentário: ${comment.body}`}</span>
          </ContainerCard>
        ))}
    </>
  )
}

export default UserCard
