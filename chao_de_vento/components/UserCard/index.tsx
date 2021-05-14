import React, { useContext, useEffect } from 'react'
import { UserFileContext } from '../contexts'
import { ButtonAlbums, ContainerCard } from './styles'
import { User } from '../../@types/types'
import { AiOutlineCamera } from 'react-icons/ai'
import { HiOutlinePhotograph } from 'react-icons/hi'

const UserCard = () => {
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
                <AiOutlineCamera />
                <span>Albuns</span>
              </ButtonAlbums>
              <ButtonAlbums onClick={() => callPosts(user.id)}>
                <HiOutlinePhotograph />
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
        photos.map((photo) => (
          <ContainerCard key={`cv-${photo.albumId}-${photo.title}`}>
            <img src={photo.thumbnailUrl} alt="" />
            <span>{`ID: ${photo.id}`}</span>
            <span>{`Título: ${photo.title}`}</span>
          </ContainerCard>
          // <p>{photo.thumbnailUrl}</p>
        ))}
      {selectedEnum === 'posts' &&
        posts &&
        posts.map((post) => (
          <ContainerCard key={`cv-${post.id}-${post.title}`}>
            <span>{`ID: ${post.id}`}</span>
            <span>{`Título${post.title}`}</span>
            <span>{`Corpo: ${post.body}`}</span>
            <div>
              <ButtonAlbums onClick={() => deletePost(post.id)}>
                <HiOutlinePhotograph />
                <span>Remover</span>
              </ButtonAlbums>
              <ButtonAlbums>
                <HiOutlinePhotograph />
                <span>Editar</span>
              </ButtonAlbums>
              <ButtonAlbums onClick={() => callComments(post.id)}>
                <HiOutlinePhotograph />
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
