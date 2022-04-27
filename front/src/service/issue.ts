import api from './api'

export interface Issue{
  number:number,
  title:string
}

export const getIssue = async (owner: string, repo: string, issue_number: number) => {
  const response = await api.get<Issue>(`/repos/${owner}/${repo}/issues/${issue_number}`)
  return response.data
}
