import { DataStore, API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { Post, Blog } from '../models'
import PostPage from './PostPage'

function BlogPage ({ user, blog }) {
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

    const filterPosts = (tag) => {

    }

    const convertDate = async (isoDate) => {
        await isoDate
        const date = new Date(isoDate)
        let dateString = date.getDate() + " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear() + " " + isoDate.substr(11, 19)
        return dateString
    }

    // posts.map(post => (
    //     post.date = convertDate(post.createdAt)
    // )

    console.log(blog)
    console.log(posts)
    console.log(user)

    return (
        <div id='container'>
            <button onClick={filterPosts("all")}>All</button>
            <button onClick={filterPosts("thoughts")}>Thoughts</button>
            <button onClick={filterPosts("playlists")}>Playlists</button>
            <button onClick={filterPosts("quotes")}>Quotes</button>
            {user && <button onClick={createPost}>New</button>}

            {
                posts.map(post => (
                <h2 key={post.id}>
                    <Link to={`/post/${post.num}`}>
                    {post.createdAt}
                    </Link>
                </h2>)
                )
            }

            <div id="post-content">
                <PostPage />
            </div>
        </div>
    )
}

export default BlogPage