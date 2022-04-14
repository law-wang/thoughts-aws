import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Auth } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { Hub } from "@aws-amplify/core"

import Login from './Auth'
import Blog from './Blog'
import Create from './Create'
import { Tag, Post } from '../models'

import '../style.css'

function Main() {

    const [user, setUser] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)

    // const [posts, setPosts] = useState([])
    // // const [allposts, setAllPosts] = useState([])
    // const [thoughts, setThoughts] = useState([])
    // const [playlists, setPlaylists] = useState([])
    // const [quotes, setQuotes] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {        
                // fetch the current signed in user
                // then, check to see if they're a member of the admin user group
                const user = await Auth.currentAuthenticatedUser()
                setIsAdmin(user.signInUserSession.accessToken.payload['cognito:groups'].includes('admin'))
                setUser(user)

                // // query all the posts and posts by tag
                // const posts = await DataStore.query(Post)
                // const thoughts = await DataStore.query(Post, p => p.tag("eq", Tag.THOUGHTS))
                // const playlists = await DataStore.query(Post, p => p.tag("eq", Tag.PLAYLISTS))
                // const quotes = await DataStore.query(Post, p => p.tag("eq", Tag.QUOTES))
                
                // // set all posts states
                // setPosts(posts)
                // // setAllPosts(posts)
                // setThoughts(thoughts)
                // setPlaylists(playlists)
                // setQuotes(quotes)

            } catch (err) {
                console.error(err)
            }
        }    

        // const listener = Hub.listen("datastore", async hubData => {
        //     console.log("start")
        //     const  { event, data } = hubData.payload;
        //     console.log(event)
        //     console.log(data)
        //     if (event === "ready") {
        //         console.log("ready")
        //         // do something here once the data is synced from the cloud
        //     }
        // })

        getData()

        // return () => {
        //     listener()
        // }
    }, [])    

    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create user={isAdmin} />} />
            <Route exact path='/' element={<Blog />} />
        </Routes>
    )
}

export default Main