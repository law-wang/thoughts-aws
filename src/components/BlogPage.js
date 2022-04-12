import { DataStore, API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { Tag, Post } from '../models'
import '../style.css'

function BlogPage ({ user, blog }) {

    const [posts, setPosts] = useState([])
    const [allposts, setAllPosts] = useState([])
    const [thoughts, setThoughts] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [quotes, setQuotes] = useState([])
    const [currentPost, setCurrentPost] = useState({content:""})

    useEffect(() => {
        const getData = async () => {
            // query all the posts, and posts by tag
            const posts = await DataStore.query(Post)
            const thoughts = await DataStore.query(Post, p => p.tag("eq", Tag.THOUGHTS))
            const playlists = await DataStore.query(Post, p => p.tag("eq", Tag.PLAYLISTS))
            const quotes = await DataStore.query(Post, p => p.tag("eq", Tag.QUOTES))
            
            setPosts(posts)
            setAllPosts(posts)
            setThoughts(thoughts)
            setPlaylists(playlists)
            setQuotes(quotes)
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
        if (tag == "thoughts") {
            setPosts(thoughts)
            setCurrentPost({content:""})
        } else if (tag == "playlists") {
            setPosts(playlists)
            setCurrentPost({content:""})
        } else if (tag == "quotes") {
            setPosts(quotes)
            setCurrentPost({content:""})
        } else if (tag == "all") {
            setPosts(allposts)
            setCurrentPost({content:""})
        }
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
                <button onClick={e => filterPosts("all")}>All</button>
                <button onClick={e => filterPosts("thoughts")}>Thoughts</button>
                <button onClick={e => filterPosts("playlists")}>Playlists</button>
                <button onClick={e => filterPosts("quotes")}>Quotes</button>
                {user && <button onClick={createPost}>New</button>}
            </nav>

            <div id="post-list">
                {posts.map(post => (
                    <h2 key={post.id}>
                        <button onClick={e => setCurrentPost(post)}>{post.createdAt}</button>
                    </h2>)
                )}
            </div>

            <div id="post-content">
                {currentPost.content}
            </div>
        </div>
    )
}

export default BlogPage