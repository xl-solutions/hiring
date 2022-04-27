import api from './api'
import { Issue } from './issue'

export interface Repo{
    name:string,
    clone_url:string,
    html_url:string,
}

export const getUserRepos = async (username: string) => {
  const response = await api.get<Repo[]>(`/users/${username}/repos`)
  return response.data
}

export const getRepoIssues = async (owner: string, repo: string) => {
  const response = await api.get<Issue[]>(`/repos/${owner}/${repo}/issues`)
  return response.data
}
