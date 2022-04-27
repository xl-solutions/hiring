import api from './api'

export interface User{
    avatar_url:string,
    name:string,
    login:string,
}

export const getUser = async (username: string) => {
  const response = await api.get<User>(`/users/${username}`)
  return response.data
}

