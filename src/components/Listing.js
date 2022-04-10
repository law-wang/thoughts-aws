import { Auth } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Login from './Auth'
import BlogPage from './BlogPage'
import PostPage from './PostPage'
import BlogCreate from './BlogCreate'
import '../style.css'
import { Post, Blog } from '../models'

function Listing({ blogs, isAdmin }) {

    // const [blogs, setBlogs] = useState([])
    // const [isAdmin, setIsAdmin] = useState(false)
    // const [user, setUser] = useState({})

    // useEffect(() => {
    //     const getData = async () => {
    //     try {
    //         // query for all blog posts, then store them in state
    //         const blogData = await DataStore.query(Blog)
    //         setBlogs(blogData)
    //         // fetch the current signed in user
    //         const user = await Auth.currentAuthenticatedUser()
    //         console.log(user)
    //         // check to see if they're a member of the admin user group
    //         setIsAdmin(user.signInUserSession.accessToken.payload['cognito:groups'].includes('admin'))
    //         setUser(user)
    //     } catch (err) {
    //         console.error(err)
    //     }
    //     }
    //     getData()
    // }, [])

    return (
        <div>
            <h1>Thoughts</h1>
            {isAdmin && <Link to='/create'>Create a Blog</Link>}
        
            {blogs.map(blog => (
            <Link to={`/blog/${blog.name}`} key={blog.id}>
                <h2>{blog.name}</h2>
            </Link>
            ))}
        </div>
    )
}

export default Listing
