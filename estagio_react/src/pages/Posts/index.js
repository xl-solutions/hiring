import React, { useEffect, useState } from 'react'
import axios from 'axios'

const GetPostagens = () => {

  const [results, setResults] = useState([])

  const getPosts = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users/1/posts')
  }

  const getCommentsByPosts = (postId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
  }

  const prepareData = async () => {
    const { data: posts } = await getPosts()
    const result = await Promise.all(posts.map(async (post) => {
      const { data: comments } = await getCommentsByPosts(posts.id)
      

      return {
        posts: post.title,
        corpo: posts.body
      }
    }))
    console.log(posts)

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
          <li>{result.posts}            
          </li>
        )
      }) : null}
      </ul>
    </div>
  );
}

export default GetPostagens;