import { DataStore, API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { Post } from '../models'
import PostPage from './PostPage'
import '../style.css'

function BlogPage ({ user, blog }) {

    const [posts, setPosts] = useState([])
    const [currentPost, setCurrentPost] = useState({content:""})

    useEffect(() => {
        const getData = async () => {
            // query all the posts
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

    return (
        <div id='overall'>
            <nav>
                <button onClick={filterPosts("all")}>All</button>
                <button onClick={filterPosts("thoughts")}>Thoughts</button>
                <button onClick={filterPosts("playlists")}>Playlists</button>
                <button onClick={filterPosts("quotes")}>Quotes</button>
                {user && <button onClick={createPost}>New</button>}
            </nav>

            {posts.map(post => (
                <h2 key={post.id}>
                    <button onClick={e => setCurrentPost(post)}>{post.createdAt}</button>
                </h2>)
            )}

            <div id="post-content">
                <PostPage post={currentPost} />
            </div>
        </div>
    )
}

export default BlogPage