import { DataStore } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { Post, Blog } from '../models'

export default function BlogPage ({ user }) {
  const { name } = useParams()

  // body of BlogPage component inside BlogPage.js
  const [blog, setBlog] = useState({})
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const getData = async () => {
      // find the blog whose name equals the one in the url
      const data = await DataStore.query(Blog, p => p.name('eq', name))
      setBlog(data[0].id)
      // find all the posts whose blogID matches the above post's id
      const posts = await DataStore.query(Post, p => p.blogID('eq', data[0].id))
      setPosts(posts)
    }
    getData()
  }, [])

  const createPost = async () => {
    const tag = window.prompt('tag')
    const content = window.prompt('content')
 
    const newPost = await DataStore.save(new Post({
       content,
       tag,
       blogID: blog.id
    }))
  }

  return (
    <div>
      <h1>{name}</h1>
      {user && <button onClick={createPost}>create new post</button>}
      {
        posts.map(post => (
          <h2 key={post.id}>
            <Link to={`/post/${post.id}`}>
              {post.tag}
            </Link>
          </h2>)
        )
    }
    </div>
  )
}