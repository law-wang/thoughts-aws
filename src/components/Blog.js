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
                const sortedPosts = posts.slice().sort((a, b) => b.time.localeCompare(a.time))

                const thoughts = sortedPosts.filter(p => {
                    return p.tag === Tag.THOUGHTS
                })
                const playlists = sortedPosts.filter(p => {
                    return p.tag === Tag.PLAYLISTS
                })
                const quotes = sortedPosts.filter(p => {
                    return p.tag === Tag.QUOTES
                })

                setPosts(sortedPosts)
                setAllPosts(sortedPosts)
                setThoughts(thoughts)
                setPlaylists(playlists)
                setQuotes(quotes)
                // setCurrentPost(sortedPosts[0])
                console.log(sortedPosts)

                // ensure logging is correct
                // console.log(thoughts)
                // console.log(playlists)
                // console.log(quotes)
            } catch (err) {
                console.error(err)
            }
        }

        // listen for datastore to be fully loaded, then make datastore queries
        const listener = Hub.listen("datastore", async hubData => {
            const  { event, data } = hubData.payload
            // console.log(event)
            // console.log(data)
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
        const sanitized = html ? sanitize(html) : "<p>wow, nice to see you here!</p>"
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
        // setCurrentPost({content:""})
    }

    const convertDate = (post, type) => {
        const date = new Date(post.time)
        const createdAt = new Date(post.createdAt)
        let words = ("0"+date.getDate()).slice(-2) + " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear() + " " + date.toLocaleString('en-GB', { timeZone: 'UTC' }).substring(12, 18) + createdAt.toLocaleString('en-GB', { timeZone: 'UTC' }).substring(18, 20)
        let numeric = date.toLocaleString('en-GB', { timeZone: 'UTC' }).substring(0, 18) + createdAt.toLocaleString('en-GB', { timeZone: 'UTC' }).substring(18, 20)
        return type == "numeric" ? numeric : words
    }

    return (
        <div id='overall'>
            <nav id="post-nav">
                <button onClick={e => filterPosts("all")}>All</button>
                <button onClick={e => filterPosts("thoughts")}>Thoughts</button>
                <button onClick={e => filterPosts("playlists")}>Playlists</button>
                <button onClick={e => filterPosts("quotes")}>Quotes</button>
            </nav>

            <div id="post-list">
                {posts.map(post => (
                    <h2 key={post.id}>
                        <button onClick={e => setCurrentPost(post)}>{post.time ? convertDate(post, "numeric") : "a note"}</button>
                    </h2>)
                )}
            </div>

            <div id="post-content">
                <div id="post-area">
                    <div id="post-markdown" dangerouslySetInnerHTML={{__html: currentHTML}} />
                    <div>{currentPost.time ? convertDate(currentPost, "words") : ""}</div>
                </div>
                <div id="post-resize"></div>
            </div>
        </div>
    )
}

export default Blog