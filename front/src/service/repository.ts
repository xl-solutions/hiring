import api from './api'

export interface Repo{
    name:string,
    clone_url:string,
    html_url:string,
}

export const getUserRepos = async (username: string) => {
  const response = await api.get<Repo[]>(`/users/${username}/repos`)
  return response.data
}

