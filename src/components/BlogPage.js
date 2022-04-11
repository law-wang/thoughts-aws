import { DataStore, API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { Post, Blog } from '../models'

export default function BlogPage ({ user, blog }) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const getData = async () => {
      // find all the posts whose blogID matches that of blog
    //   const posts = await DataStore.query(Post, p => p.blogID('eq', blog.id))
    //   setPosts(posts)

    //   const posts = await API.graphql(`query posts {
    //     listPosts(filter: {blogID: {eq: "c7bd2b1f-363c-4e2c-85b6-d89da59225bf"}}) {
    //       items {
    //         content
    //         num
    //         tag
    //         createdAt
    //       }
    //     }
    //   }`)

        // const posts = await DataStore.query(Post);
        const posts = await DataStore.query(Post)
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
            blogID: blog.id,
            createdAt: new Date().toISOString(),
            num: posts.length + 1
        }))
  }

  console.log(blog)
  console.log(posts)
  console.log(user)

  return (
    <div>
      {user && <button onClick={createPost}>create new post</button>}
      {
        posts.map(post => (
          <h2 key={post.id}>
            <Link to={`/post/${post.num}`}>
              {post.content}
            </Link>
          </h2>)
        )
    }
    </div>
  )
}