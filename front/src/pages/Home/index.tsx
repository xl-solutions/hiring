import React, { FormEvent, useState } from 'react';
import { Container } from './styles';
import {User,getUser} from '../../service/user'
import UserInfo from '../../components/UserInfo';
import axios, { AxiosError } from 'axios';

function Home() {
  const [user,setUser] = useState<User>()
  const [search,setSearch] = useState('')
  const [error,setError] = useState('')

  const searchUser = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUser(undefined)
    try{
      const userData = await getUser(search)
      setUser(userData)
      setError('')
    }
    catch(err){
      const error = err as Error | AxiosError;
      if(axios.isAxiosError(error)){
        if(error.response?.status === 404){
          setError('Usuário não encontrado')
        }
      }
      else{
        console.log('wee')
        setError('Algo inesperado aconteceu')
      }
    }
    setSearch('')
  };
  return (
    <Container>
      <h1>Busque por um usuário!</h1>
      <form onSubmit={searchUser}>
        <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Usuário a ser buscado"
        />
        <button>Procurar</button>
      </form>
      {error && <span>{error}</span>}
      {user && <UserInfo user={user}/>}
    </Container>
  );
}

export default Home;
