import React, { useContext } from 'react'
import { UserFileContext } from '../contexts/index'
import utilStyles from '../../styles/utils.module.css'
import { FiSkipBack } from 'react-icons/fi'
import { TitleH2 } from './styles'

const Title = () => {
  const { selectedEnum, callSelectedEnum } = useContext(UserFileContext)

  return (
    <div>
      {selectedEnum === 'users' && (
        <TitleH2 className={utilStyles.headingLg}>Usuários</TitleH2>
      )}
      {selectedEnum === 'albums' && (
        <TitleH2
          className={utilStyles.headingLg}
          onClick={() => callSelectedEnum('users')}
        >
          <FiSkipBack />
          Albums
          <br />
          <span>Clique aqui para voltar:</span>
        </TitleH2>
      )}
      {selectedEnum === 'photos' && (
        <TitleH2
          className={utilStyles.headingLg}
          onClick={() => callSelectedEnum('albums')}
        >
          <FiSkipBack />
          Fotos
          <br />
          <span>Clique aqui para voltar:</span>
        </TitleH2>
      )}
      {selectedEnum === 'posts' && (
        <TitleH2
          className={utilStyles.headingLg}
          onClick={() => callSelectedEnum('users')}
        >
          <FiSkipBack />
          Posts
          <br />
          <span>Clique aqui para voltar:</span>
        </TitleH2>
      )}
      {selectedEnum === 'comments' && (
        <TitleH2
          className={utilStyles.headingLg}
          onClick={() => callSelectedEnum('posts')}
        >
          <FiSkipBack />
          Comentários
          <br />
          <span>Clique aqui para voltar:</span>
        </TitleH2>
      )}
    </div>
  )
}

export default Title
