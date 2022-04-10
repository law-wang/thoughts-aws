import { Auth } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { Blog } from '../models'
import Login from './Auth'
import BlogPage from './BlogPage'
import PostPage from './PostPage'
import BlogCreate from './BlogCreate'
import Listing from './Listing'
import '../style.css'


function Main() {
  const [blogs, setBlogs] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        // query for all blog posts, then store them in state
        const blogData = await DataStore.query(Blog)
        setBlogs(blogData)
        // fetch the current signed in user
        const user = await Auth.currentAuthenticatedUser()
        console.log(user)
        // check to see if they're a member of the admin user group
        setIsAdmin(user.signInUserSession.accessToken.payload['cognito:groups'].includes('admin'))
        setUser(user)
      } catch (err) {
        console.error(err)
      }
    }
    getData()
  }, [])

  return (
    <div className='Main'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<BlogCreate isAdmin={isAdmin} />} />
        <Route path='/blog/:name' element={<BlogPage user={user} />} />
        <Route path='/post/:num' element={<PostPage user={user} />} />
        <Route exact path='/' element={<Listing isAdmin={isAdmin} blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default Main


{/* <h1>Thoughts</h1>
          {isAdmin && <Link to='/blog/create'>Create a Blog</Link>}

          {blogs.map(blog => (
            <Link to={`/blog/${blog.name}`} key={blog.id}>
              <h2>{blog.name}</h2>
            </Link>
          ))} */}