import { DataStore } from '@aws-amplify/datastore'
import { Hub } from "@aws-amplify/core"
import { useEffect, useState } from 'react'

import { marked } from 'marked'
import { sanitize } from 'dompurify'

import { Tag, Post } from '../models'
import '../style.css'

function Blog () {

    const [posts, setPosts] = useState([])
    const [allposts, setAllPosts] = useState([])
    const [thoughts, setThoughts] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [quotes, setQuotes] = useState([])
    const [currentPost, setCurrentPost] = useState({content:""})
    const [currentHTML, setCurrentHTML] = useState("")

    useEffect(() => {
        const start = async () => {
            await DataStore.start()
        }

        const getData = async () => {
            try {
                // query all posts and filter by tags
                const posts = await DataStore.query(Post)
                const thoughts = posts.filter(p => {
                    return p.tag === Tag.THOUGHTS
                })
                const playlists = posts.filter(p => {
                    return p.tag === Tag.PLAYLISTS
                })
                const quotes = posts.filter(p => {
                    return p.tag === Tag.QUOTES
                })

                setPosts(posts)
                setAllPosts(posts)
                setThoughts(thoughts)
                setPlaylists(playlists)
                setQuotes(quotes)

                // ensure logging is correct
                console.log(thoughts)
                console.log(playlists)
                console.log(quotes)
            } catch (err) {
                console.error(err)
            }
        }

        // listen for datastore to be fully loaded, then make datastore queries
        const listener = Hub.listen("datastore", async hubData => {
            const  { event, data } = hubData.payload
            console.log(event)
            console.log(data)

            if (event === "ready") {
                getData()
            }
        })

        start()
        return () => {
            listener()
        }
    }, [])

    useEffect(() => {
        const html = marked.parse(currentPost.content)
        const sanitized = sanitize(html)
        setCurrentHTML(sanitized)
    }, [currentPost])

    // tag buttons to filter posts
    const filterPosts = (tag) => {
        if (tag === "thoughts") {
            setPosts(thoughts)
        } else if (tag === "playlists") {
            setPosts(playlists)
        } else if (tag === "quotes") {
            setPosts(quotes)
        } else if (tag === "all") {
            setPosts(allposts)
        }
        setCurrentPost({content:""})
    }

    const convertDate = isoDate => {
        const date = new Date(isoDate)
        let dateString = date.getDate() + " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear() + " " + date.toString().substring(16, 25)
        return dateString
    }

    return (
        <div id='overall'>
            <nav>
                <button onClick={e => filterPosts("all")}>All</button>
                <button onClick={e => filterPosts("thoughts")}>Thoughts</button>
                <button onClick={e => filterPosts("playlists")}>Playlists</button>
                <button onClick={e => filterPosts("quotes")}>Quotes</button>
            </nav>

            <div id="post-list">
                {posts.map(post => (
                    <h2 key={post.id}>
                        <button onClick={e => setCurrentPost(post)}>{post.time ? convertDate(post.time) : "a note"}</button>
                    </h2>)
                )}
            </div>

            <div id="post-content" dangerouslySetInnerHTML={{__html: currentHTML}} />
        </div>
    )
}

export default Blog