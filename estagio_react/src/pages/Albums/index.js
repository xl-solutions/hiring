import React, { useEffect, useState } from 'react'
import axios from 'axios'

const GetAlbums = () => {

  const [results, setResults] = useState([])

  const getUsers = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
  }

  const getAlbunsByUser = (userId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
  }

  const prepareData = async () => {
    const { data: users } = await getUsers()
    const result = await Promise.all(users.map(async (user) => {
      const { data: albuns } = await getAlbunsByUser(user.id)
      

      return {
        userName: user.name,
        userId: user.id,
        albuns
      }
    }))

    setResults(result)
  }

  useEffect(() => {
    prepareData()
  }, [])

  return (
    <div>
      <ul>
      {results.length ? results.map(result => {
        return (
          <li>{result.userName}
            <ul>
              {result.albuns.map(album => {
                return <li>{album.title}</li>
              })}
            </ul>
          </li>
        )
      }) : null}
      </ul>
    </div>
  );
}

export default GetAlbums;
